import React, { SyntheticEvent } from 'react';

import gql from 'graphql-tag';
import { compose, withStateHandlers } from 'recompose';
import styled from 'styled-components';

import { ADD_GROUP_MUTATION } from 'app/graph/mutations';
import withMutation from 'app/graph/withMutation';

import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Icon, ListContainer, ListItem, Loading } from 'app/styles';
import { Keyboard } from 'puppeteer';

interface InjectedProps {
  adding: boolean;
  newGroup: string;
  isAdding: ( value: boolean ) => void;
  updateNewGroup: ( value: string ) => void;
  createGroup: ( variables: any ) => void;
}

interface ExternalProps {
  nextId: number;
}

type Props = ExternalProps & InjectedProps;

function AddHeader ( { nextId, adding, updateNewGroup, createGroup, isAdding, newGroup }: Props ) {
  if ( adding ) {
    return (
      <ListItem variant="header">
        <input
          type="text"
          onChange={ ( event: any ) => updateNewGroup( event.target.value ) }
          onKeyPress={ ( event: any ) => {
            if ( event.key === 'Enter' ) {
              createGroup( { variables: {
                id: nextId,
                name: newGroup,
              } } ); 
            }
          } }
          autoFocus/>

        <div className="icon" onClick={ () => {
          if ( newGroup !== '' ) {
            createGroup( { variables: {
              id: nextId,
              name: newGroup,
            } } ); 
          }
        } }>
          <FontAwesomeIcon icon={ faPlus } />
        </div>

        <div className="icon" onClick={ () => isAdding( false ) }>
          <FontAwesomeIcon icon={ faTimes } />
        </div>
      </ListItem>
    );
  } else {
    return (
      <ListItem variant="header">
        Things To Do
        <div onClick={ () => isAdding( true ) }>
          <FontAwesomeIcon icon={ faPlus } />
        </div>
      </ListItem>
    );
  }
}

export default compose<InjectedProps, ExternalProps>(
  withMutation( ADD_GROUP_MUTATION, 'createGroup' ),
  withStateHandlers(
    () => ( {
      adding: false,
      newGroup: '',
    } ),
    {
      isAdding: ( { adding } ) => ( value ) => ( {
        adding: value,
      } ),
      updateNewGroup: ( { newGroup } ) => ( value ) => ( {
        newGroup: value,
      } ),
    },
  ),
)( AddHeader );
