import * as React from 'react';

import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import gql from 'graphql-tag';
import { DateTime } from 'luxon';
import { ApolloConsumer } from 'react-apollo';
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
  onClick = ( client: any, locked: boolean ) =>
                                                         ( event: any ) => {
    if ( !locked ) {
      client.mutate( {
        mutation: UPDATE_TASK_MUTATION,
        variables: { 
          completedAt: this.props.task.completedAt ? null : DateTime.local().toISO(),
          id: this.props.task.id,
        },
      } );

      if ( this.props.task.completedAt ) {
        const mutation = this.resolveParentLocks( this.props.task.id, this.props.allTasks );

        client.mutate( {
          mutation: gql`
            mutation updateTasks {
              ${ mutation }
            }
          `,
        } );
      }
    }
  }

  /**
   * resolveParentLocks - Iterate over all tasks and determine
   * parent relationship. If a parent is being placed in a locked state
   * then the task needs to be updated to reflect that.
   */
  resolveParentLocks ( id: string, allTasks: TaskType[] ) {
    const depends: string[] = [];
    const mutations: string[] = [];
    const parentIds = ( treeId: string ) => {
      allTasks.forEach( task => {
        if ( task.dependencyIds.includes( parseInt( treeId, 10 ) ) 
             && !depends.includes( task.id ) && task.completedAt ) {
          depends.push( task.id );

          mutations.push( `
            task${ task.id }: updateTask(id: ${ task.id }, completedAt: null) {
              id
              completedAt
            }` );

          return parentIds( task.id );
        }
      } );
    };

    parentIds( id );

    return mutations;
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

  renderIcon ( completedAt: DateTime | undefined, locked: boolean ) {
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
      <ApolloConsumer>
        { ( client ) => (
          <TaskItem
            locked={ locked }
            completed={ this.props.task.completedAt !== null }
            onClick={ this.onClick( client, locked ) }>
            <Icon icon={ this.renderIcon( this.props.task.completedAt, locked ) }/>
            { this.props.task.task }
          </TaskItem>
        ) }
      </ApolloConsumer>
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
