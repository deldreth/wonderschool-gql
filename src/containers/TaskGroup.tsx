import React from 'react';

import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import styled from 'styled-components';

import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ADD_GROUP_MUTATION } from 'app/graph/mutations';
import { ALL_GROUPS_QUERY, ALL_TASKS_QUERY, GROUP_TASKS_QUERY } from 'app/graph/queries';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';

import Icon from 'app/components/Icon';
import InputHeader from 'app/components/InputHeader';
import { ListContainer, ListItem, Loading } from 'app/components/Styles';
import { Group, Task } from 'app/types';

interface ExternalProps {
}

export interface InjectedProps {
  allTasks: Task[];
  loading: boolean;
  routeTo: ( path: string ) => () => void;
  aggregates: {
    [ group: string ]: {
      completed: number,
      total: number,
    },
  };
}

export type Props = ExternalProps & InjectedProps & RouteComponentProps<any>;

class TaskGroup extends React.Component<Props> {
  routeTo = ( value: string )  => () => {
    this.props.history.push( value );
  }

  aggregates = ( groupName: string ) => {
    if ( !this.props.allTasks ) {
      return null;
    }

    const aggregates: Props['aggregates'] = {};
    this.props.allTasks.forEach( task => {    
      if ( !aggregates.hasOwnProperty( task.Group.name ) ) {
        aggregates[ task.Group.name ] = {
          completed: 0,
          total: 0,
        };
      }
      
      aggregates[ task.Group.name ].completed += task.completedAt ? 1 : 0;
      aggregates[ task.Group.name ].total += 1;
    } );
    
    if ( aggregates[ groupName ] ) {
      return (
        <TaskGroupItemAggregate>
          { aggregates[ groupName ].completed } of { aggregates[ groupName ].total } tasks complete
        </TaskGroupItemAggregate>
      );
    }
  
    return null;
  }

  render () {
    return (
      <ListContainer>
        <Query query={ ALL_GROUPS_QUERY } pollInterval={ 500 }>
          {
            ( { loading, data: { allGroups }, refetch } ) => {
              if ( loading ) {
                return <Loading>...</Loading>;
              }
  
              return [
                <Mutation
                  key="group-add-header"
                  mutation={ ADD_GROUP_MUTATION }>
                  { ( createGroup ) => (
                    <InputHeader
                      createMutationHandler={ createGroup }
                      nextId={ allGroups.length + 1 }
                      postAdd={ refetch }/>
                  ) }
                </Mutation>,
                allGroups.map( ( group: Group ) => (
                  <TaskGroupItem key={ group.id }
                    onClick={ this.routeTo( `/group/${group.id}` ) }>
                    <Icon icon={ faCaretRight } />
        
                    <TaskGroupItemText>
                      { group.name }
        
                      { this.aggregates( group.name ) }
                    </TaskGroupItemText>
                  </TaskGroupItem>
                ) ),
              ];
            }
          }
        </Query>
      </ListContainer>
    );
  }
}

export default compose<InjectedProps, ExternalProps>(
  withRouter,
  withQuery( ALL_TASKS_QUERY ),
)( TaskGroup );

const TaskGroupItem = ListItem.extend`
  &:hover {
    cursor: pointer;
  }
`;

const TaskGroupItemText = styled.div`
`;

const TaskGroupItemAggregate = styled.div`
  padding: 4px 0px 0px 0px;
  color: #AAAAAA;
`;
