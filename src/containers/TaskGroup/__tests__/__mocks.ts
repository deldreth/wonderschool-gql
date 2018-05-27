import { Group as GroupType } from 'app/types';

export interface MockGroup extends GroupType {
  __typename: string;
}

export const allGroups: GroupType[] = [
  {
    id: '1',
    name: 'The First Group',
  },
];
