import { DataQuery, DataSourceJsonData } from '@grafana/data';

export type QueryType = 'earnings' | 'payouts' | 'payouts-cumulative' | 'reports';

export const typeOptions = [
  { label: 'Earnings', value: 'earnings' },
  { label: 'Payouts', value: 'payouts' },
  { label: 'Cumulative Payouts', value: 'payouts-cumulative' },
  { label: 'Reports', value: 'reports' },
  { label: 'Reports (JSON)', value: 'reports-raw' },
];

export interface HackeroneQuery extends DataQuery {
  type: QueryType;
}

export function isValidType(type: string | undefined): type is QueryType {
  return typeOptions.some((option) => option.value === type);
}

export const defaultQuery: Partial<HackeroneQuery> = {
  type: 'reports',
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
