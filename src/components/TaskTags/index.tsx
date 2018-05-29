import * as React from 'react';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Mutation, Query } from 'react-apollo';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';

import { ALL_TASKS_QUERY } from 'app/graph/queries';

interface Props {
  tags: Array<{ id: number, text: string }>;
  handleAddition: ( tag: string ) => void;
  handleDeletion: ( index: number ) => void;
}

const TaskTags = ( { tags, handleAddition, handleDeletion }: Props ) => (
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
        placeholder="Search for dependencies"
        tags={ tags }
        suggestions={ suggestions }
        handleAddition={ handleAddition }
        handleDelete={ handleDeletion }/>
    );
  } }
  </Query>
);

export default TaskTags;
