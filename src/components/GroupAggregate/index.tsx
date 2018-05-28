import * as React from 'react';

import { Query } from 'react-apollo';
import styled from 'styled-components';

import { ALL_TASKS_BY_GROUP_QUERY } from 'app/graph/queries';

export interface Props {
  group: string;
}

const GroupAggregate = ( { group }: Props ) => (
  <Query query={ ALL_TASKS_BY_GROUP_QUERY } variables={{ group }}>
    { ( { loading, data: { allTasks } } ) => {
      if ( loading || ( allTasks && !allTasks.length ) ) {
        return null;
      }
      
      const completed = allTasks.filter( task => !!task.completedAt ).length;

      return (
        <TaskGroupItemAggregate>
          { completed } of { allTasks.length } tasks complete
        </TaskGroupItemAggregate>
      );
    } }
  </Query>
);

export default GroupAggregate;

const TaskGroupItemAggregate = styled.div`
  padding: 4px 0px 0px 0px;
  color: #AAAAAA;
`;
