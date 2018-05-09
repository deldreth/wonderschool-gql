import React from 'react';

import gql from 'graphql-tag';
import { DateTime } from 'luxon';
import { Query } from 'react-apollo';
import compose from 'recompose/compose';
import styled from 'styled-components';

import { UPDATE_TASK_MUTATION } from 'app/graph/mutations';
import { ALL_TASKS_QUERY } from 'app/graph/queries';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';

import { Icon, ListItem, Loading } from 'app/styles';
import { Task as TaskType } from 'app/types';

interface ExternalProps {
  task: TaskType;
}

export interface InjectedProps {
  allTasks: TaskType[];
  loading: boolean;
  updateTask: ( id: any ) => void;
}

type Props = ExternalProps & InjectedProps;

function Task ( { task, allTasks, loading, updateTask }: Props ) {
  if ( loading ) {
    return <Loading>...</Loading>;
  }

  const locked = resolveLocks( task.dependencyIds, allTasks );
  
  return (
    <TaskItem
      locked={ locked }
      completed={ task.completedAt !== null }
      onClick={ () => {
        if ( !locked ) {
          updateTask( { variables: { 
            id: task.id,
            completedAt: task.completedAt ? null : DateTime.local().toISO(),
          } } );

          resolveParentLocks( task.id, allTasks, updateTask );
        }
      } }>
      <Icon>{ renderTaskIcon( task, locked ) }</Icon>
      { task.task }
    </TaskItem>
  );
}

/**
 * resolveParentLocks - Iterate over all tasks and determine
 * parent relationship. If a parent is being placed in a locked state
 * then the task needs to be updated to reflect that.
 * 
 * This probably isn't the most performant approach... maybe offload
 * batch writes to cache?
 */
function resolveParentLocks ( id: string,
                              allTasks: TaskType[],
                              updateTask: Props['updateTask'] ) {
  const depends: string[] = [];
  // Recurse the dependency graph
  const parentIds = ( treeId: string ) => {
    allTasks.forEach( task => {
      if ( task.dependencyIds.includes( parseInt( treeId, 10 ) ) && !depends.includes( task.id ) && task.completedAt ) {
        depends.push( task.id );
        updateTask( { variables: { id: task.id, completedAt: null } } );
        return parentIds( task.id );
      }
    } );
  };
  
  parentIds( id );
}

function resolveLocks ( dependencies: number[], allTasks: TaskType[] ): boolean {
  let locked = false;
  allTasks.forEach( depends => {
    if ( dependencies.includes( parseInt( depends.id, 10 ) ) && !depends.completedAt ) {
      locked = true;
    }
  } );

  return locked;
}

function renderTaskIcon ( task: TaskType, taskIsLocked: boolean ) {
  if ( taskIsLocked ) {
    return <img src={ require( 'static/Locked.svg' ) }/>;
  }

  if ( task.completedAt ) {
    return <img src={ require( 'static/Completed.svg' ) }/>;
  } else {
    return <img src={ require( 'static/Incomplete.svg' ) }/>;
  }
}

export default compose<InjectedProps, ExternalProps>(
  withQuery( ALL_TASKS_QUERY ),
  withMutation( UPDATE_TASK_MUTATION, 'updateTask' ),
)( Task );

interface TaskItemProps {
  locked: boolean;
  completed: boolean;
}
const TaskItem = styled<TaskItemProps, any>( ListItem )`
  color: ${ props => {
    if ( props.locked || props.completed ) {
      return '#BBBBBB';
    }

    return '#000000';
  } }

  &:hover {
    cursor: ${ props => props.locked ? 'default' : 'pointer' };
  }
`;
