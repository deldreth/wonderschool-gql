import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';

import TaskList from 'app/containers/TaskList';
import { ALL_TASKS_QUERY, GROUP_NAME_QUERY } from 'app/graph/queries';
import { mockMatch, mockQuery } from '../../../../stories/utils';

const stories = storiesOf( 'Task List', module );

const Group = { __typename: 'Group', id: '1', name: 'Group 1' };

stories.add( 'All unlocked', () => {
  const mocks: any = [
    mockQuery( GROUP_NAME_QUERY, { Group }, { id: '1' } ),
    mockQuery(
      ALL_TASKS_QUERY,
      {
        allTasks: [
          { __typename: 'Task', id: '1', task: 'Task 1', 
            completedAt: null, dependencyIds: [], Group },
          { __typename: 'Task', id: '2', task: 'Task 2',
            completedAt: null, dependencyIds: [], Group },
          { __typename: 'Task', id: '3', task: 'Task 3',
            completedAt: null, dependencyIds: [], Group },
        ],
      },
    ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskList match={ mockMatch }/>
    </MockedProvider>
  );
} );

stories.add( 'Second depends on the first', () => {
  const mocks: any = [
    mockQuery( GROUP_NAME_QUERY, { Group }, { id: '1' } ),
    mockQuery(
      ALL_TASKS_QUERY,
      {
        allTasks: [
          { __typename: 'Task', id: '1', task: 'Task 1', 
            completedAt: null, dependencyIds: [], Group },
          { __typename: 'Task', id: '2', task: 'Task 2',
            completedAt: null, dependencyIds: [ 1 ], Group },
          { __typename: 'Task', id: '3', task: 'Task 3',
            completedAt: null, dependencyIds: [], Group },
        ],
      },
    ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskList match={ mockMatch }/>
    </MockedProvider>
  );
} );

stories.add( 'Third completed', () => {
  const mocks: any = [
    mockQuery( GROUP_NAME_QUERY, { Group }, { id: '1' } ),
    mockQuery(
      ALL_TASKS_QUERY,
      {
        allTasks: [
          { __typename: 'Task', id: '1', task: 'Task 1', 
            completedAt: null, dependencyIds: [], Group },
          { __typename: 'Task', id: '2', task: 'Task 2',
            completedAt: null, dependencyIds: [ 1 ], Group },
          { __typename: 'Task', id: '3', task: 'Task 3',
            completedAt: DateTime.local(), dependencyIds: [], Group },
        ],
      },
    ),
  ];

  return (
    <MockedProvider mocks={ mocks }>
      <TaskList match={ mockMatch }/>
    </MockedProvider>
  );
} );
