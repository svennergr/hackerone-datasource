package plugin

import (
	"context"
	"encoding/json"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/liamg/hackerone"
	"github.com/liamg/hackerone/pkg/api"
)

// Make sure SampleDatasource implements required interfaces. This is important to do
// since otherwise we will only get a not implemented error response from plugin in
// runtime. In this example datasource instance implements backend.QueryDataHandler,
// backend.CheckHealthHandler, backend.StreamHandler interfaces. Plugin should not
// implement all these interfaces - only those which are required for a particular task.
// For example if plugin does not need streaming functionality then you are free to remove
// methods that implement backend.StreamHandler. Implementing instancemgmt.InstanceDisposer
// is useful to clean up resources used by previous datasource instance when a new datasource
// instance created upon datasource settings changed.
var (
	_ backend.QueryDataHandler      = (*HackeroneDatasource)(nil)
	_ backend.CheckHealthHandler    = (*HackeroneDatasource)(nil)
	_ backend.StreamHandler         = (*HackeroneDatasource)(nil)
	_ instancemgmt.InstanceDisposer = (*HackeroneDatasource)(nil)
)

// NewHackeroneDatasource creates a new datasource instance.
func NewHackeroneDatasource(_ backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
	return &HackeroneDatasource{}, nil
}

// HackeroneDatasource is an example datasource which can respond to data queries, reports
// its health and has streaming skills.
type HackeroneDatasource struct{}

// Dispose here tells plugin SDK that plugin wants to clean up resources when a new instance
// created. As soon as datasource settings change detected by SDK old datasource instance will
// be disposed and a new one will be created using NewSampleDatasource factory function.
func (d *HackeroneDatasource) Dispose() {
	// Clean up datasource instance resources.
}

type jsonSettings struct {
	UserName string `json:"userName"`
}

type dataSourceSettings struct {
	UserName string
	ApiKey   string
}

func parseSettings(context backend.PluginContext) (dataSourceSettings, error) {
	var jsonsettings jsonSettings
	var settings dataSourceSettings

	if err := json.Unmarshal(context.DataSourceInstanceSettings.JSONData, &jsonsettings); err != nil {
		return dataSourceSettings{}, err
	}

	apiKey := context.DataSourceInstanceSettings.DecryptedSecureJSONData["apiKey"]

	settings.ApiKey = apiKey
	settings.UserName = jsonsettings.UserName

	return settings, nil
}

// QueryData handles multiple queries and returns multiple responses.
// req contains the queries []DataQuery (where each query contains RefID as a unique identifier).
// The QueryDataResponse contains a map of RefID to the response for each query, and each response
// contains Frames ([]*Frame).
func (d *HackeroneDatasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	log.DefaultLogger.Info("QueryData called", "request", req)

	// create response struct
	response := backend.NewQueryDataResponse()

	// loop over queries and execute them individually.
	for _, q := range req.Queries {
		res := d.query(ctx, req.PluginContext, q)

		// save the response in a hashmap
		// based on with RefID as identifier
		response.Responses[q.RefID] = res
	}

	return response, nil
}

type queryModel struct {
	QueryType string `json:"type"`
}

func (d *HackeroneDatasource) query(_ context.Context, pCtx backend.PluginContext, query backend.DataQuery) backend.DataResponse {
	response := backend.DataResponse{}

	settings, err := parseSettings(pCtx)

	log.DefaultLogger.Info("settings", "request", settings)

	if err != nil {
		log.DefaultLogger.Error("settings error", "request", err.Error())

		response.Error = err
		return response
	}

	// Unmarshal the JSON into our queryModel.
	var qm queryModel

	response.Error = json.Unmarshal(query.JSON, &qm)
	if response.Error != nil {
		return response
	}

	h1 := hackerone.New(settings.UserName, settings.ApiKey)
	earnings, _, err := h1.Hackers.GetEarnings(context.TODO(), &api.PageOptions{PageNumber: 0})
	if err != nil {
		response.Error = err
		return response
	}

	if qm.QueryType == "earnings" {
		// create data frame response.
		frame := data.NewFrame("earnings")

		times := []time.Time{}
		values := []float64{}
		for _, earning := range earnings {
			time, err := time.Parse("2006-01-02T15:04:05.000Z", earning.Attributes.CreatedAt)
			if err != nil {
				response.Error = err
				return response
			}
			if !d.inTime(time, query.TimeRange) {
				continue
			}
			times = append(times, time)
			values = append(values, earning.Attributes.Amount)
		}

		// add fields.
		frame.Fields = append(frame.Fields,
			data.NewField("time", nil, times),
			data.NewField("values", nil, values),
		)

		response.Frames = append(response.Frames, frame)
	} else if qm.QueryType == "payouts" {

		payouts, _, err := h1.Hackers.GetPayouts(context.TODO(), &api.PageOptions{PageNumber: 0})
		if err != nil {
			response.Error = err
			return response
		}

		// create data frame response.
		frame := data.NewFrame("payouts")

		times := []time.Time{}
		values := []float64{}
		for _, payout := range payouts {
			if !d.inTime(payout.PaidOutAt, query.TimeRange) {
				continue
			}
			times = append(times, payout.PaidOutAt)
			values = append(values, float64(payout.Amount))
		}

		// add fields.
		frame.Fields = append(frame.Fields,
			data.NewField("time", nil, times),
			data.NewField("values", nil, values),
		)

		response.Frames = append(response.Frames, frame)
	}
	// reports, _, err := h1.Hackers.GetReports(context.TODO(), &api.PageOptions{PageNumber: 0})
	// if err != nil {
	// 	response.Error = err
	// 	return response
	// }

	// response.Frames = append(response.Frames, frame)

	// // create data frame response.
	// frame = data.NewFrame("reports_created")

	// times = []time.Time{}
	// values = []float64{}
	// for _, report := range reports {
	// 	if report.Attributes.CreatedAt.Before(t) {
	// 		continue
	// 	}
	// 	times = append(times, report.Attributes.CreatedAt)
	// 	values = append(values, float64(1))
	// }

	// // add fields.
	// frame.Fields = append(frame.Fields,
	// 	data.NewField("time", nil, times),
	// 	data.NewField("values", nil, values),
	// )

	// response.Frames = append(response.Frames, frame)

	// // create data frame response.
	// frame = data.NewFrame("reports_closed")

	// times = []time.Time{}
	// values = []float64{}
	// for _, report := range reports {
	// 	if report.Attributes.ClosedAt.Before(t) {
	// 		continue
	// 	}

	// 	times = append(times, report.Attributes.ClosedAt)
	// 	values = append(values, float64(1))
	// }

	// // add fields.
	// frame.Fields = append(frame.Fields,
	// 	data.NewField("time", nil, times),
	// 	data.NewField("values", nil, values),
	// )

	// response.Frames = append(response.Frames, frame)

	return response
}

func (d *HackeroneDatasource) inTime(time time.Time, q backend.TimeRange) bool {
	return time.After(q.From) && time.Before(q.To)
}

// CheckHealth handles health checks sent from Grafana to the plugin.
// The main use case for these health checks is the test button on the
// datasource configuration page which allows users to verify that
// a datasource is working as expected.
func (d *HackeroneDatasource) CheckHealth(_ context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	log.DefaultLogger.Info("CheckHealth called", "request", req)

	var status = backend.HealthStatusOk
	var message = "Data source is working"
	var settings dataSourceSettings

	settings, err := parseSettings(req.PluginContext)

	h1 := hackerone.New(settings.UserName, settings.ApiKey)
	balance, err := h1.Hackers.GetBalance(context.TODO())
	if err != nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: err.Error(),
		}, nil
	}

	log.DefaultLogger.Info("balance", "balance", balance)

	return &backend.CheckHealthResult{
		Status:  status,
		Message: message,
	}, nil
}

// SubscribeStream is called when a client wants to connect to a stream. This callback
// allows sending the first message.
func (d *HackeroneDatasource) SubscribeStream(_ context.Context, req *backend.SubscribeStreamRequest) (*backend.SubscribeStreamResponse, error) {
	log.DefaultLogger.Info("SubscribeStream called", "request", req)

	status := backend.SubscribeStreamStatusPermissionDenied
	if req.Path == "stream" {
		// Allow subscribing only on expected path.
		status = backend.SubscribeStreamStatusOK
	}
	return &backend.SubscribeStreamResponse{
		Status: status,
	}, nil
}

// RunStream is called once for any open channel.  Results are shared with everyone
// subscribed to the same channel.
func (d *HackeroneDatasource) RunStream(ctx context.Context, req *backend.RunStreamRequest, sender *backend.StreamSender) error {
	log.DefaultLogger.Info("RunStream called", "request", req)

	// Create the same data frame as for query data.
	frame := data.NewFrame("response")

	// Add fields (matching the same schema used in QueryData).
	frame.Fields = append(frame.Fields,
		data.NewField("time", nil, make([]time.Time, 1)),
		data.NewField("values", nil, make([]int64, 1)),
	)

	counter := 0

	// Stream data frames periodically till stream closed by Grafana.
	for {
		select {
		case <-ctx.Done():
			log.DefaultLogger.Info("Context done, finish streaming", "path", req.Path)
			return nil
		case <-time.After(time.Second):
			// Send new data periodically.
			frame.Fields[0].Set(0, time.Now())
			frame.Fields[1].Set(0, int64(10*(counter%2+1)))

			counter++

			err := sender.SendFrame(frame, data.IncludeAll)
			if err != nil {
				log.DefaultLogger.Error("Error sending frame", "error", err)
				continue
			}
		}
	}
}

// PublishStream is called when a client sends a message to the stream.
func (d *HackeroneDatasource) PublishStream(_ context.Context, req *backend.PublishStreamRequest) (*backend.PublishStreamResponse, error) {
	log.DefaultLogger.Info("PublishStream called", "request", req)

	// Do not allow publishing at all.
	return &backend.PublishStreamResponse{
		Status: backend.PublishStreamStatusPermissionDenied,
	}, nil
}
