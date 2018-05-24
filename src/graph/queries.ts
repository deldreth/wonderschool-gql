import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const ALL_TASKS_QUERY = gql`
  {
    allTasks {
      id
      completedAt
      dependencyIds
      Group {
        id
        name
      }
    }
  }
`;

export const ALL_GROUPS_QUERY = gql`
  {
    allGroups {
      id
      name
    }
  }
`;

export const GROUP_NAME_QUERY = gql`
  query groupName( $id: ID! ) {
    Group( id: $id ) {
      name
    }
  }
`;

export const GROUP_TASKS_QUERY = gql`
  query allTasksByGroup($group: ID!) {
    allTasks(filter: { group_id: $group }) {
      id
      task
      completedAt
      dependencyIds
    }
  }
`;
