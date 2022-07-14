import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface HackeroneQuery extends DataQuery {
  type: 'earnings' | 'payouts' | 'payouts-cumulative' | 'reports';
}

export const typeOptions = [
  { label: 'earnings', value: 'earnings' },
  { label: 'payouts', value: 'payouts' },
  { label: 'payouts-cumulative', value: 'payouts-cumulative' },
  { label: 'reports', value: 'reports' },
];

export function validType(type: string) {
  return typeOptions.find((option) => option.value === type);
}

export const defaultQuery: Partial<HackeroneQuery> = {
  type: 'payouts',
};

/**
 * These are options configured for each DataSource instance.
 */
export interface HackeroneOptions extends DataSourceJsonData {
  userName: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface HackeroneSecureJson {
  apiKey?: string;
}
