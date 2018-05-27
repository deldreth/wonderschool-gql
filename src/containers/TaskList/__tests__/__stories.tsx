import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { MockedProvider } from 'react-apollo/test-utils';

import Task from 'app/components/Task';
import { allGroups } from 'app/containers/TaskGroup/__tests__/__mocks';
import { allTasks } from 'app/containers/TaskList/__tests__/__mocks';
import { ALL_TASKS_QUERY } from 'app/graph/queries';
import { Group as GroupType, Task as TaskType } from 'app/types';

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
      <Task task={ allTasks[ 1 ] } allTasks={ allTasks } />
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
      <Task task={ allTasks[ 0 ] } allTasks={ allTasks } />
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
      <Task task={ allTasks[ 2 ] } allTasks={ allTasks } />
    </MockedProvider>
  );
} );
