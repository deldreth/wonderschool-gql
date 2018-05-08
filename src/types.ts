import { InMemoryCache } from 'apollo-cache-inmemory';
import { DateTime } from 'luxon';

export interface Task {
  id: string;
  group: string;
  task: string;
  dependencyIds: number[];
  completedAt?: DateTime;
}

export interface StateCache {
  cache: InMemoryCache;
}
