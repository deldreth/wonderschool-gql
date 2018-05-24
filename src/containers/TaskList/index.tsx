import React from 'react';

import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import styled from 'styled-components';

import { GROUP_TASKS_QUERY } from 'app/graph/queries';

import Task from 'app/components/Task';
import { ListContainer, ListItem, Loading } from 'app/styles';
import { Task as TaskType } from 'app/types';

interface ExternalProps {}

export interface InjectedProps {
  tasks: TaskType[];
}

type Props = ExternalProps & InjectedProps & RouteComponentProps<any>;

function TaskList ( { tasks, match }: Props ) {
  return (
    <ListContainer>
      
      <ListItem variant="header">{ match.params.group }</ListItem>

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
}

export default compose<InjectedProps, ExternalProps>()( TaskList );
