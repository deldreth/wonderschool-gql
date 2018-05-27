import * as React from 'react';

import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Mutation from 'react-apollo/Mutation';
import styled from 'styled-components';

import { ADD_GROUP_MUTATION } from 'app/graph/mutations';

import Icon from 'app/components/Icon';
import { ListItem } from 'app/components/Styles';

interface Props {
  nextId: number;
  postAdd: () => void;
}

export default class InputHeader extends React.Component<Props> {
  state = {
    adding: false,
    nextItemValue: '',
  };

  onChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    this.setState( { nextItemValue: event.target.value } );
  }

  toggleAdding = () => {
    this.setState( { adding: !this.state.adding } );
  }

  onCreateItem = ( createGroup: ( variables: any ) => void ) =>
    ( event: React.KeyboardEvent<HTMLInputElement> ) => {

    const { nextItemValue } = this.state;
    if ( nextItemValue && nextItemValue !== '' && event.key === 'Enter' ) {
      createGroup( { variables: {
        id: this.props.nextId,
        name: nextItemValue,
      } } );

      this.setState( { nextItemValue: '' } );
      
      this.props.postAdd();
    }
  }

  onAddClick = ( createGroup: ( variables: any ) => void ) => 
    ( event: React.MouseEvent<HTMLDivElement> ) => {

    const { nextItemValue } = this.state;
    if ( nextItemValue && nextItemValue !== '' ) {
      createGroup( { variables: {
        id: this.props.nextId,
        name: nextItemValue,
      } } );

      this.setState( { nextItemValue: '' } );

      this.props.postAdd();
    }
  }

  render () {
    if ( this.state.adding ) {
      return (
        <Mutation mutation={ ADD_GROUP_MUTATION }>
          { ( createGroup ) => (
            <ListItem variant="header">
              <input
                type="text"
                autoFocus
                value={ this.state.nextItemValue }
                onChange={ this.onChange }
                onKeyPress={ this.onCreateItem( createGroup ) }/>

              <Icon
                variant="right"
                icon={ faPlusCircle }
                onClick={ this.onAddClick( createGroup ) } />

              <Icon
                variant="right"
                icon={ faTimesCircle }
                onClick={ this.toggleAdding }/>
            </ListItem>
          ) }
        </Mutation>
      );
    } else {
      return (
        <ListItem variant="header"
          onClick={ this.toggleAdding }>
          Things To Do
          <Icon
            variant="right"
            icon={ faPlusCircle }/>
        </ListItem>
      );
    }
  }
}
