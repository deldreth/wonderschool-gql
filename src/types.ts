import { InMemoryCache } from 'apollo-cache-inmemory';
import { DateTime } from 'luxon';

export interface Task {
  id: string;
  Group: Group;
  task: string;
  dependencyIds: number[];
  completedAt?: DateTime;
}

export interface Group {
  id: string;
  name: string;
}

export interface StateCache {
  cache: InMemoryCache;
}
