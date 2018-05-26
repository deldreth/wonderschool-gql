import React from 'react';

import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import compose from 'recompose/compose';
import styled from 'styled-components';

import { UPDATE_TASK_MUTATION } from 'app/graph/mutations';
import { ALL_TASKS_QUERY } from 'app/graph/queries';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';

import Icon from 'app/components/Icon';
import { ListItem, Loading } from 'app/components/Styles';
import { Task as TaskType } from 'app/types';

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
    return faLock;
  }

  if ( task.completedAt ) {
    return faCheckSquare;
  } else {
    return faSquare;
  }
};

class Task extends React.Component<Props> {
  onClick = ( locked: boolean ) =>
                 ( event: any ) => {
    if ( !locked ) {
      this.props.updateTask( { variables: { 
        completedAt: this.props.task.completedAt ? null : DateTime.local().toISO(),
        id: this.props.task.id,
      } } );

      this.resolveParentLocks( this.props.task.id, this.props.allTasks, this.props.updateTask );
    }
  }

  /**
   * resolveParentLocks - Iterate over all tasks and determine
   * parent relationship. If a parent is being placed in a locked state
   * then the task needs to be updated to reflect that.
   * 
   * This probably isn't the most performant approach... maybe offload
   * batch writes to cache?
   */
  resolveParentLocks ( id: string,
                       allTasks: TaskType[],
                       updateTask: Props['updateTask'] ) {
    const depends: string[] = [];
    // Recurse the dependency graph
    const parentIds = ( treeId: string ) => {
      allTasks.forEach( task => {
        if ( task.dependencyIds.includes( parseInt( treeId, 10 ) ) 
             && !depends.includes( task.id ) && task.completedAt ) {
          depends.push( task.id );
          updateTask( { variables: { id: task.id, completedAt: null } } );
          return parentIds( task.id );
        }
      } );
    };
    
    parentIds( id );
  }

  resolveLocks ( dependencies: number[], allTasks: TaskType[] ): boolean {
    let locked = false;
    allTasks.forEach( depends => {
      if ( dependencies.includes( parseInt( depends.id, 10 ) ) && !depends.completedAt ) {
        locked = true;
      }
    } );

    return locked;
  }

  render () {
    if ( this.props.loading ) {
      return <Loading>...</Loading>;
    }
  
    const locked = this.resolveLocks( this.props.task.dependencyIds, this.props.allTasks );
    
    return (
      <TaskItem
        locked={ locked }
        completed={ this.props.task.completedAt !== null }
        onClick={ this.onClick( locked ) }>
        <Icon icon={ renderIcon( this.props.task, locked ) }/>
        { this.props.task.task }
      </TaskItem>
    );
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
