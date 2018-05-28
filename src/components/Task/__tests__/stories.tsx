import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';

import Task from 'app/components/Task';
import { ALL_TASKS_QUERY } from 'app/graph/queries';

const stories = storiesOf( 'Task', module );

const mocks = [ {
  id: '1',
  task: 'One',
  dependencyIds: [ 2 ],
  completedAt: null,
  Group: {
    id: '1',
    name: 'Group 1',
  },
}, {
  id: '2',
  task: 'Two',
  dependencyIds: [],
  completedAt: null,
  Group: {
    id: '1',
    name: 'Group 1',
  },
}, {
  id: '3',
  task: 'Three',
  dependencyIds: [],
  completedAt: DateTime.local(),
  Group: {
    id: '1',
    name: 'Group 1',
  },
} ];

stories.add( 'Locked', () =>
  (
    <MockedProvider>
      <Task task={ mocks[0] } allTasks={ mocks } />
    </MockedProvider>
  ) );

stories.add( 'Unlocked', () =>
  (
    <MockedProvider>
      <Task task={ mocks[ 1 ] } allTasks={ mocks } />
    </MockedProvider>
  ) );

stories.add( 'Completed', () =>
  (
    <MockedProvider>
      <Task task={ mocks[ 2 ] } allTasks={ mocks } />
    </MockedProvider>
  ) );
