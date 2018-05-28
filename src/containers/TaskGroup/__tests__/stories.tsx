import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';

import TaskGroup from 'app/containers/TaskGroup';
import { ALL_GROUPS_QUERY, ALL_TASKS_QUERY, GROUP_TASKS_QUERY } from 'app/graph/queries';

const mockRouteTo = ( path: string ) => () => null;

const stories = storiesOf( 'Task Group', module );
stories.addDecorator( story => (
  <MemoryRouter>
    { story() }
  </MemoryRouter>
) );

const mockQuery = ( query: string, data: any, variables?: any ) => ( {
  request: { query, variables },
  result: { data },
} );

stories.add( 'No groups', () => {
  const mocks: any = [
    mockQuery( ALL_GROUPS_QUERY, { allGroups: [] } ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskGroup routeTo={ mockRouteTo }/>
    </MockedProvider>
  );
} );

stories.add( 'New group', () => {
  const mocks: any = [
    mockQuery(
      ALL_GROUPS_QUERY,
      { allGroups: [
        { __typename: 'Group', id: '1', name: 'Group 1' },
      ] },
    ),
    mockQuery( GROUP_TASKS_QUERY, { allTasks: [] }, { group: '1' } ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskGroup routeTo={ mockRouteTo } />
    </MockedProvider>
  );
} );

stories.add( 'With aggregates', () => {
  const mocks: any = [
    mockQuery(
      ALL_GROUPS_QUERY,
      { allGroups: [
          { __typename: 'Group', id: '1', name: 'Group 1' },
      ] },
    ),
    mockQuery(
      GROUP_TASKS_QUERY,
      { allTasks: [
        { __typename: 'Task', id: '1', task: '1 - 1', completedAt: DateTime.local(), dependencyIds: [] },
        { __typename: 'Task', id: '2', task: '1 - 2', completedAt: null, dependencyIds: [] },
      ] },
      { group: '1' },
    ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskGroup routeTo={ mockRouteTo }/>
    </MockedProvider>
  );
} );

stories.add( 'Multiple groups, one new', () => {
  const mocks: any = [
    mockQuery(
      ALL_GROUPS_QUERY,
      { allGroups: [
        { __typename: 'Group', id: '1', name: 'Group 1' },
        { __typename: 'Group', id: '2', name: 'Group 2' },
      ] },
    ),
    mockQuery(
      GROUP_TASKS_QUERY,
      { allTasks: [
        { __typename: 'Task', id: '1', task: '1 - 1', completedAt: DateTime.local(), dependencyIds: [] },
        { __typename: 'Task', id: '2', task: '1 - 2', completedAt: null, dependencyIds: [] },
      ] },
      { group: '1' },
    ),
    mockQuery( GROUP_TASKS_QUERY, { allTasks: [] }, { group: '2' } ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskGroup routeTo={ mockRouteTo } />
    </MockedProvider>
  );
} );
