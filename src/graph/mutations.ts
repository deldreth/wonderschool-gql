import gql from 'graphql-tag';

export const UPDATE_TASK_MUTATION = gql`
  mutation completeTask($id: ID!, $completedAt: String) {
    updateTask(id: $id, completedAt:$completedAt) {
      id
      group
      task
      completedAt
    }
  }
`;
