import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import styled from 'styled-components';

import { ALL_TASKS_QUERY, GROUP_TASKS_QUERY } from 'app/graph/queries';
import withQuery from 'app/graph/withQuery';

import { Icon, ListContainer, ListItem, Loading } from 'app/styles';
import { Task } from 'app/types';

interface ExternalProps {}

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
  groups: string[];
}

type Props = ExternalProps & InjectedProps & RouteComponentProps<any>;

function TaskGroup ( { allTasks, loading, routeTo, aggregates, groups }: Props ) {
  if ( loading ) {
    return (
      <Loading>...</Loading>
    );
  }

  return (
    <ListContainer>
      <ListItem variant="header">Things To Do</ListItem>
      {
        groups.map( group => (
          <TaskGroupItem key={ group }
            onClick={ routeTo( `/group/${group}` ) }>
            <Icon>
              <img src={ require( 'static/Group.svg' ) }/>
            </Icon>

            <TaskGroupItemText>
              { group }

              <TaskGroupItemAggregate>
                { aggregates[group].completed } OF { aggregates[group].total } TASKS COMPLETE
              </TaskGroupItemAggregate>
            </TaskGroupItemText>
          </TaskGroupItem>
        ) )
      }
    </ListContainer>
  );
}

export default compose<InjectedProps, ExternalProps>(
  withRouter,
  withQuery( ALL_TASKS_QUERY ),
  withProps( ( { allTasks, loading }: Props ) => {
    if ( loading ) {
      return {};
    }

    const groups: string[] = [];
    allTasks.forEach( task => {
      if ( !groups.includes( task.group ) ) {
        groups.push( task.group );
      }
    } );

    return { groups };
  } ),
  withProps( ( { allTasks, loading }: Props ) => {
    if ( loading ) {
      return {};
    }

    const aggregates: Props['aggregates'] = {};
    allTasks.forEach( task => {    
      if ( !aggregates.hasOwnProperty( task.group ) ) {
        aggregates[ task.group ] = {
          completed: 0,
          total: 0,
        };
      }
      
      aggregates[ task.group ].completed += task.completedAt ? 1 : 0;
      aggregates[ task.group ].total += 1;
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
