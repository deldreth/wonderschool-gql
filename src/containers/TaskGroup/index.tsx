import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';
import styled from 'styled-components';

import { ADD_GROUP_MUTATION } from 'app/graph/mutations';
import { ALL_GROUPS_QUERY, ALL_TASKS_QUERY, GROUP_TASKS_QUERY } from 'app/graph/queries';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';

import { Icon, ListContainer, ListItem, Loading } from 'app/styles';
import { Group, Task } from 'app/types';

import AddHeader from './addHeader';

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

function TaskGroup ( { routeTo, aggregates }: Props ) {
  return (
    <ListContainer>
      <Query query={ ALL_GROUPS_QUERY } pollInterval={ 500 }>
        {
          ( { loading, data: { allGroups } } ) => {
            if ( loading ) {
              return <Loading>...</Loading>;
            }

            return [
              <AddHeader
                key="group-add-header"
                nextId={ allGroups.length + 1 } />,
              allGroups.map( ( group: Group ) => (
                <TaskGroupItem key={ group.id }
                  onClick={ routeTo( `/group/${group.id}` ) }>
                  <Icon>
                    <img src={ require( 'static/Group.svg' ) }/>
                  </Icon>
      
                  <TaskGroupItemText>
                    { group.name }
      
                    { ( aggregates && aggregates[group.name] ) ? 
                      <Aggregate agg={ aggregates[group.name] }/>
                    : null }
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

function Aggregate ( { agg }: any ) {
  return (
    <TaskGroupItemAggregate>
      { agg.completed } OF { agg.total } TASKS COMPLETE
    </TaskGroupItemAggregate>
  );
} 

export default compose<InjectedProps, ExternalProps>(
  withRouter,
  withQuery( ALL_TASKS_QUERY ),
  withProps( ( { allTasks, loading }: Props ) => {
    if ( loading ) {
      return {};
    }

    const aggregates: Props['aggregates'] = {};
    allTasks.forEach( task => {    
      if ( !aggregates.hasOwnProperty( task.Group.name ) ) {
        aggregates[ task.Group.name ] = {
          completed: 0,
          total: 0,
        };
      }
      
      aggregates[ task.Group.name ].completed += task.completedAt ? 1 : 0;
      aggregates[ task.Group.name ].total += 1;
    } );
    
    return { aggregates };
  } ),
  withHandlers( {
    routeTo: ( { history }: Props ) => ( value: string )  => () => {
      history.push( value );
    },
  } ),
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
