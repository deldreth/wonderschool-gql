import { DateTime } from 'luxon';

import { Group as GroupType, Task as TaskType } from 'app/types';

interface MockGroup extends GroupType {
  __typename: string;
}

interface MockTask extends TaskType {
  __typename: string;
  Group: MockGroup;
}

export const allGroups: MockGroup[] = [
  {
    __typename: 'Group',
    id: '1',
    name: 'The First Group',
  },
];

export const allTasks: MockTask[] = [
  {
    __typename: 'Task',
    id: '1',
    Group: allGroups[ 0 ],
    task: 'Go to the bank',
    dependencyIds: [],
  },
  {
    __typename: 'Task',
    id: '2',
    Group: allGroups[ 0 ],
    task: 'Fly One',
    dependencyIds: [1],
  },
  {
    __typename: 'Task',
    id: '3',
    Group: allGroups[ 0 ],
    task: 'Completed',
    dependencyIds: [],
    completedAt: DateTime.local(),
  },
];
