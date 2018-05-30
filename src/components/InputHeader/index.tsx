import * as React from 'react';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Mutation } from 'react-apollo';

import { CREATE_GROUP_MUTATION } from 'app/graph/mutations';
import { ALL_GROUPS_QUERY } from 'app/graph/queries';

import Icon from 'app/components/Icon';
import { ListItem } from 'app/components/Styles';

interface Props {
  nextId: number;
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
    }

    if ( event.key === 'Escape' ) {
      this.toggleAdding();
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
    }
  }

  render () {
    if ( this.state.adding ) {
      return (
        <Mutation
          mutation={ CREATE_GROUP_MUTATION }
          refetchQueries={ [ { query: ALL_GROUPS_QUERY } ] }>
          { ( createGroup ) => (
            <ListItem variant="header">
              <input
                placeholder="Group"
                type="text"
                autoFocus
                value={ this.state.nextItemValue }
                onChange={ this.onChange }
                onKeyDown={ this.onCreateItem( createGroup ) }/>

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
        <ListItem
        variant="header"
          hover
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
