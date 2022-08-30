module github.com/grafana/grafana-starter-datasource-backend

go 1.16

require (
	github.com/grafana/grafana-plugin-sdk-go v0.137.0
	github.com/liamg/hackerone v0.0.7
	github.com/magefile/mage v1.13.0 // indirect

)

replace github.com/liamg/hackerone => github.com/svennergr/hackerone-api-client v0.0.8-0.20220830190516-7c9efbf825c2
