import { defaults } from 'lodash';

import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { ActionMeta, Select } from '@grafana/ui';
import React, { PureComponent } from 'react';
import { DataSource } from './datasource';
import { defaultQuery, HackeroneOptions, HackeroneQuery, typeOptions, isValidType } from './types';

type Props = QueryEditorProps<DataSource, HackeroneQuery, HackeroneOptions>;

export class QueryEditor extends PureComponent<Props> {
  onTypeChange = (value: SelectableValue<string>, actionMeta: ActionMeta) => {
    if (!isValidType(value.value)) {
      return;
    }

    const { onChange, query } = this.props;
    onChange({ ...query, type: value.value });
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { type } = query;

    return (
      <div className="gf-form">
        <Select options={typeOptions} value={type} onChange={this.onTypeChange} />
      </div>
    );
  }
}
