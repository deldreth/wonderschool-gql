import { DateTime } from 'luxon';

import { allGroups } from 'app/containers/TaskGroup/__tests__/__mocks';
import { Group, Task } from 'app/types';

interface MockTask extends Task {
  __typename: string;
  Group: Group;
}

export const allTasks: Task[] = [
  {
    id: '1',
    Group: allGroups[ 0 ],
    task: 'Go to the bank',
    dependencyIds: [],
  },
  {
    id: '2',
    Group: allGroups[ 0 ],
    task: 'Fly One',
    dependencyIds: [1],
  },
  {
    id: '3',
    Group: allGroups[ 0 ],
    task: 'Completed',
    dependencyIds: [],
    completedAt: DateTime.local(),
  },
];
