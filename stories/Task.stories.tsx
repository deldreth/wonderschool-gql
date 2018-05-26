import React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';

import Task from '../src/components/Task';
import { ALL_TASKS_QUERY } from '../src/graph/queries';
import { Group as GroupType, Task as TaskType } from '../src/types';
import { allGroups, allTasks } from './mocks';

const stories = storiesOf( 'Task', module );

stories.add( 'Locked', () => {
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

stories.add( 'Unlocked', () => {
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
      <Task task={ allTasks[ 0 ] } />
    </MockedProvider>
  );
} );

stories.add( 'Completed', () => {
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
      <Task task={ allTasks[ 2 ] } />
    </MockedProvider>
  );
} );
