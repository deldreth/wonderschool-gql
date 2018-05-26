import { shallow } from 'enzyme';
import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';

import TaskGroup from 'app/containers/TaskGroup';
import { ALL_TASKS_QUERY } from 'app/graph/queries';
import { Task as TaskType } from 'app/types';

it( 'should render a TaskGroup component', async () => {
  const mocks: any = [ {
    request: { query: ALL_TASKS_QUERY },
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
            id: '2',
            group: 'Airplanes',
            task: 'Fly One',
            dependencyIds: [1],
            completedAt: null,
          },
        ],
      },
    },
  } ];

  const groups = [ 'Purchases', 'Airplanes' ];

  const wrapper = shallow(
    <MockedProvider mocks={ mocks }>
      <TaskGroup />
    </MockedProvider>,
  );

  expect( wrapper ).toMatchSnapshot();
} );
