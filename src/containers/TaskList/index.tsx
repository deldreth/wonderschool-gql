import * as React from 'react';

import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { ALL_TASKS_QUERY, GROUP_NAME_QUERY } from 'app/graph/queries';

import CreateTask from 'app/components/CreateTask';
import { ListContainer, ListItem, Loading } from 'app/components/Styles';
import Task from 'app/components/Task';
import { Task as TaskType } from 'app/types';

export type Props = Pick<RouteComponentProps<any>, 'match'>;

const TaskList = ( { match }: Props ) =>
  (
    <TaskListContainer>
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

      <Query query={ ALL_TASKS_QUERY }>
        { ( { loading, data: { allTasks } } ) => {
          if ( loading ) {
            return <Loading>...</Loading>;
          }

          return (
            <CreateTask 
              group={ match.params.group }
              nextTask={ allTasks.length + 1 }/>
          );
        } }
      </Query>
    </TaskListContainer>
  );

export default TaskList;

const TaskListContainer = ListContainer.extend`
  grid-column: 7 / 13;

  @media only screen and (min-width: 768px) {
    grid-column: 5 / 9;
  }
`;
