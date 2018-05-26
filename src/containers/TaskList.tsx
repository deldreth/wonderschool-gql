import React from 'react';

import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';

import { GROUP_NAME_QUERY, GROUP_TASKS_QUERY } from 'app/graph/queries';

import { ListContainer, ListItem, Loading } from 'app/components/Styles';
import Task from 'app/components/Task';
import { Task as TaskType } from 'app/types';

export type Props = RouteComponentProps<any>;

const TaskList = ( { match }: Props ) =>
  (
    <ListContainer>
      <Query query={ GROUP_NAME_QUERY } variables={ { id: match.params.group } }>
        {
          ( { loading, data: { Group } } ) => {
            if ( loading ) {
              return <Loading>...</Loading>;
            }

            return (
              <ListItem variant="header">
                { Group.name }
              </ListItem>
            );
          }
        }
      </Query>

      <Query query={ GROUP_TASKS_QUERY } variables={ { group: match.params.group } }>
        {
          ( { loading, data: { allTasks } } ) => {
            if ( loading ) {
              return <Loading>...</Loading>;
            }

            return allTasks.map(
              ( task: TaskType ) => <Task key={ task.id } task={ task }/>,
            );
          }
        }
      </Query>

    </ListContainer>
  );

export default TaskList;
