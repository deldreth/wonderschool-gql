import * as React from 'react';

import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';

import { ALL_TASKS_QUERY, GROUP_NAME_QUERY } from 'app/graph/queries';

import { ListContainer, ListItem, Loading } from 'app/components/Styles';
import Task from 'app/components/Task';
import { Task as TaskType } from 'app/types';

export type Props = Pick<RouteComponentProps<any>, 'match'>;

const TaskList = ( { match }: Props ) =>
  (
    <ListContainer>
      <Query query={ GROUP_NAME_QUERY } variables={ { id: match.params.group } }>
        { ( { loading, data: { Group } } ) => {
          if ( loading ) {
            return <Loading>...</Loading>;
          }

          return (
            <ListItem variant="header">
              { Group.name }
            </ListItem>
          );
        } }
      </Query>

      <Query query={ ALL_TASKS_QUERY }>
        { ( { loading, data: { allTasks } } ) => {
          if ( loading ) {
            return <Loading>...</Loading>;
          }

          return allTasks.filter( ( task: TaskType ) => task.Group.id === match.params.group )
            .map( ( task: TaskType ) => (
              <Task key={ task.id }
                task={ task }
                allTasks={ allTasks }/>
            ) );
        } }
      </Query>

    </ListContainer>
  );

export default TaskList;
