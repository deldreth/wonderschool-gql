import gql from 'graphql-tag';

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $completedAt: String) {
    updateTask(id: $id, completedAt:$completedAt) {
      id
      task
      completedAt
      Group {
        id
        name
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation createTask( $id: ID!, $group_id: ID!, $task: String!, $dependencyIds: [Int]!, $completedAt: String ) {
    createTask ( id: $id, group_id: $group_id, task: $task, dependencyIds: $dependencyIds, completedAt: $completedAt ) {
      id
      task
      completedAt
      dependencyIds
      Group {
        id
        name
      }
    }
  }
`;

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup( $id: ID!, $name: String! ) {
    createGroup( id: $id, name: $name ) {
      id
      name
    }
  }
`;
