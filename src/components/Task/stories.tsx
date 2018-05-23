import React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';

import Task from 'app/components/Task';
import { ALL_TASKS_QUERY } from 'app/graph/queries';
import { Task as TaskType } from 'app/types';

const stories = storiesOf( 'Task', module );

interface MockTask extends TaskType {
  __typename: string;
}
const allTasks: MockTask[] = [
  {
    __typename: 'Task',
    id: '1',
    group: 'Purchases',
    task: 'Go to the bank',
    dependencyIds: [],
    completedAt: null,
  },
  {
    __typename: 'Task',
    id: '2',
    group: 'Airplanes',
    task: 'Fly One',
    dependencyIds: [1],
    completedAt: null,
  },
];

stories.add( 'Default', () => {
  const mocks: any = [ {
    request: {
      query: ALL_TASKS_QUERY,
    },
    result: {
      data: {
        allTasks, 
      },
    },
  } ];

  return (
    <MockedProvider mocks={ mocks }>
      <Task task={ allTasks[ 1 ] } />
    </MockedProvider>
  );
} );
