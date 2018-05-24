import { shallow } from 'enzyme';
import React from 'react';

import Task from 'app/components/Task';
import { Task as TaskType } from 'app/types';

it( 'should render a Task component', () => {
  const data: TaskType = {
    id: '1',
    Group: {
      id: '1',
      name: 'Purchases',
    },
    task: 'Go to the bank',
    dependencyIds: [1],
    completedAt: null,
  };

  const wrapper = shallow(
    <Task task={ data } />,
  );

  expect( wrapper ).toMatchSnapshot();
} );
