import * as React from 'react';

import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { DateTime } from 'luxon';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { UPDATE_TASK_MUTATION } from 'app/graph/mutations';
import { ALL_TASKS_QUERY } from 'app/graph/queries';

import Icon from 'app/components/Icon';
import { ListItem, Loading } from 'app/components/Styles';
import { Task as TaskType } from 'app/types';

export interface Props {
  task: TaskType;
  allTasks: TaskType[];
}

class Task extends React.Component<Props> {
  onClick = ( updateTask: ( variables: any ) => void, locked: boolean ) =>
                 ( event: any ) => {
    if ( !locked ) {
      updateTask( { variables: { 
        completedAt: this.props.task.completedAt ? null : DateTime.local().toISO(),
        id: this.props.task.id,
      } } );

      this.resolveParentLocks( this.props.task.id, this.props.allTasks, updateTask );
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
                       updateTask: ( variables: any ) => void ) {
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

  renderIcon ( completedAt: DateTime | null | undefined, locked: boolean ) {
    if ( locked ) {
      return faLock;
    }
  
    if ( completedAt ) {
      return faCheckSquare;
    } else {
      return faSquare;
    }
  }

  render () {
    const locked = this.resolveLocks( this.props.task.dependencyIds, this.props.allTasks );
    
    return (
      <Mutation mutation={ UPDATE_TASK_MUTATION }>
        { ( updateTask ) => (
          <TaskItem
            locked={ locked }
            completed={ this.props.task.completedAt !== null }
            onClick={ this.onClick( updateTask, locked ) }>
            <Icon icon={ this.renderIcon( this.props.task.completedAt, locked ) }/>
            { this.props.task.task }
          </TaskItem>
        ) }
      </Mutation>
    );
  }
}

export default Task;

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
