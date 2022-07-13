import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { HackeroneQuery, HackeroneOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, HackeroneQuery, HackeroneOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
