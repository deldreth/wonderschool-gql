import { shallow } from 'enzyme';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';

import { GROUP_TASKS_QUERY } from 'app/graph/queries';
import { Task as TaskType } from 'app/types';
import TaskList from './index';

it( 'should render a TaskList component', async () => {
  const mocks: any = [ {
    request: { query: GROUP_TASKS_QUERY },
    result: {
      data: {
        allTasks: [
          {
            id: '1',
            group: 'Purchases',
            task: 'Go to the bank',
            dependencyIds: [1],
            completedAt: null,
          },
          {
            id: '3',
            group: 'Purchases',
            task: 'Make a big one',
            dependencyIds: [1],
            completedAt: null,
          },
        ],
      },
    },
  } ];

  const wrapper = shallow(
    <MockedProvider mocks={ mocks }>
      <TaskList />
    </MockedProvider>,
  );

  expect( wrapper ).toMatchSnapshot();
} );
