import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const ALL_TASKS_QUERY = gql`
  {
    allTasks {
      id
      group
      completedAt
      dependencyIds
    }
  }
`;

export const GROUP_TASKS_QUERY = gql`
  query allTasksByGroup($group: String!) {
    allTasks(filter: { group: $group }) {
      id
      task
      completedAt
      dependencyIds
    }
  }
`;
