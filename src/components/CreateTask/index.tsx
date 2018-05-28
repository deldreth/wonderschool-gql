import * as React from 'react';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Mutation, Query } from 'react-apollo';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';

import { CREATE_TASK_MUTATION } from 'app/graph/mutations';
import { ALL_TASKS_QUERY } from 'app/graph/queries';

import Icon from 'app/components/Icon';
import { Actions, Button, ListItem } from 'app/components/Styles';
import { Group, Task } from 'app/types';

export interface Props {
  group: Group['id'];
  nextTask: number;
  postAdd: ( ...args: any[] ) => void;
}

class CreateTask extends React.Component<Props> {
  state = {
    adding: false,
    newTask: '',
    newTaskDeps: [],
  };

  toggleAdding = () => this.setState( { adding: !this.state.adding } );

  onChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    this.setState( { newTask: event.target.value } );
  }

  create = ( createTask: ( variables: any ) => void ) => 
    ( event: React.MouseEvent<HTMLDivElement> ) => {
    const dependencyIds = this.state.newTaskDeps.map( ( task: Task ) => task.id );

    createTask( { variables: {
      id: this.props.nextTask,
      group_id: this.props.group,
      task: this.state.newTask,
      completedAt: null,
      dependencyIds,
    } } );

    this.setState( {
      adding: false,
      newTask: '',
    } );

    this.props.postAdd();
  }

  renderTags = () =>
    (
      <Query query={ ALL_TASKS_QUERY }>
      { ( { loading, data: { allTasks } } ) => {
        if ( loading ) {
          return '...';
        }

        const suggestions = allTasks.map( task => ( {
          id: task.id,
          text: task.task,
        } ) );

        return (
          <ReactTags
            placeholder="Search for Dependencies"
            tags={ this.state.newTaskDeps }
            suggestions={ suggestions }
            handleAddition={ ( tag: string ) =>
              this.setState( { newTaskDeps: [
                ...this.state.newTaskDeps,
                tag,
              ] } )
            }
            handleDelete={ ( id: number ) => {
              this.setState( { 
                newTaskDeps: this.state.newTaskDeps.filter( ( task, index ) => index !== id ),
              } );
            } }/>
        );
      } }
      </Query>
    )

  render () {
    if ( this.state.adding ) {
      return (
        <Mutation mutation={ CREATE_TASK_MUTATION }>
          { ( createTask ) => (
            <ListItemDown>
              <input
                placeholder="Task"
                type="text"
                onChange={ this.onChange }/>

              { this.renderTags() }

              <Actions>
                <Button onClick={ this.toggleAdding }>
                  <Icon icon={ faTimesCircle } />
                  Dismiss
                </Button>

                <Button onClick={ this.create( createTask ) }>
                  <Icon icon={ faPlusCircle } />
                  Create
                </Button>
              </Actions>
            </ListItemDown>
          ) }
        </Mutation>
      );
    } else {
      return (
        <ListItemRight
          hover
          onClick={ this.toggleAdding }>
          <Button>
            <Icon icon={ faPlusCircle } />
            New Task
          </Button>
        </ListItemRight>
      );
    }
  }
}

export default CreateTask;

const ListItemRight = ListItem.extend`
  justify-content: flex-end;
`;

const ListItemDown = ListItem.extend`
  flex-direction: column;
  align-items: flex-start;
  height: auto;

  padding: 16px 0px;
`;
