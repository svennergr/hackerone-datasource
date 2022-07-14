import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { HackeroneOptions, HackeroneQuery } from './types';

export class DataSource extends DataSourceWithBackend<HackeroneQuery, HackeroneOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<HackeroneOptions>) {
    super(instanceSettings);

    this.annotations = {};
  }
}
