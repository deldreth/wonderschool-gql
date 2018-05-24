import gql from 'graphql-tag';

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $completedAt: String) {
    updateTask(id: $id, completedAt:$completedAt) {
      id
      group
      task
      completedAt
    }
  }
`;
