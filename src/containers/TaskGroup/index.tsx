import * as React from 'react';

import Query from 'react-apollo/Query';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ALL_GROUPS_QUERY } from 'app/graph/queries';

import GroupAggregate from 'app/components/GroupAggregate';
import Icon from 'app/components/Icon';
import InputHeader from 'app/components/InputHeader';
import { ListContainer, ListItem, Loading } from 'app/components/Styles';
import { Group, Task } from 'app/types';

export interface InjectedProps {
  routeTo: ( path: string ) => () => void;
}

export type Props = InjectedProps & RouteComponentProps<any>;

class TaskGroup extends React.Component<Props> {
  routeTo = ( value: string )  => () => {
    this.props.history.push( value );
  }

  render () {
    return (
      <ListContainer>
        <Query query={ ALL_GROUPS_QUERY }>
          { ( { loading, data: { allGroups }, refetch } ) => {
            if ( loading ) {
              return <Loading>...</Loading>;
            }

            return [
              <InputHeader
                key="input-header"
                nextId={ allGroups.length + 1 }
                postAdd={ refetch }/>,

              allGroups.map( ( group: Group ) => (
                <ListItem
                  key={ group.id }
                  hover
                  onClick={ this.routeTo( `/group/${group.id}` ) }>
                  <Icon icon={ faCaretRight } />
      
                  <GroupText>
                    { group.name }

                    <GroupAggregate group={ group.id } />
                  </GroupText>
                </ListItem>
              ) ),
            ];
          } }
        </Query>
      </ListContainer>
    );
  }
}

export default withRouter<Props>( TaskGroup );

const GroupText = styled.div`
`;
