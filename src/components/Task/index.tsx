import React from 'react';

import gql from 'graphql-tag';
import { DateTime } from 'luxon';
import { Query } from 'react-apollo';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import styled from 'styled-components';

import { UPDATE_TASK_MUTATION } from 'app/graph/mutations';
import { ALL_TASKS_QUERY } from 'app/graph/queries';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';

import { Icon, ListItem, Loading } from 'app/styles';
import { Task as TaskType } from 'app/types';
import { resolveLocks, resolveParentLocks } from './helpers';

interface ExternalProps {
  task: TaskType;
}

export interface InjectedProps {
  allTasks: TaskType[];
  loading: boolean;
  updateTask: ( id: any ) => void;
  onClick: ( locked: boolean ) => void;
}

export type Props = ExternalProps & InjectedProps;

const renderIcon = function renderTaskIcon( task: TaskType, taskIsLocked: boolean ) {
  if ( taskIsLocked ) {
    return <img src={ require( 'static/Locked.svg' ) }/>;
  }

  if ( task.completedAt ) {
    return <img src={ require( 'static/Completed.svg' ) }/>;
  } else {
    return <img src={ require( 'static/Incomplete.svg' ) }/>;
  }
};

const TaskComponent = function Task ( { task, allTasks, loading, updateTask, onClick }: Props ) {
  if ( loading ) {
    return <Loading>...</Loading>;
  }

  const locked = resolveLocks( task.dependencyIds, allTasks );
  
  return (
    <TaskItem
      locked={ locked }
      completed={ task.completedAt !== null }
      onClick={ onClick( locked ) }>
      <Icon>{ renderIcon( task, locked ) }</Icon>
      { task.task }
    </TaskItem>
  );
};

export default compose<InjectedProps, ExternalProps>(
  withQuery( ALL_TASKS_QUERY ),
  withMutation( UPDATE_TASK_MUTATION, 'updateTask' ),
  withHandlers( {
    onClick: ( { task, allTasks, updateTask }: Props ) =>
                                   ( locked: boolean ) =>
                                        ( event: any ) => {
      if ( !locked ) {
        updateTask( { variables: { 
          id: task.id,
          completedAt: task.completedAt ? null : DateTime.local().toISO(),
        } } );

        resolveParentLocks( task.id, allTasks, updateTask );
      }
    },
  } ),
)( TaskComponent );

interface TaskItemProps {
  locked: boolean;
  completed: boolean;
}
const TaskItem = styled<TaskItemProps, any>( ListItem )`
  color: ${ props => {
    if ( props.locked ) {
      return '#BBBBBB';
    }

    return '#000000';
  } }

  text-decoration: ${ props => props.completed ? 'line-through' : 'none' };

  &:hover {
    cursor: ${ props => props.locked ? 'default' : 'pointer' };
  }
`;
