import React from 'react';

import { Query } from 'react-apollo';
import compose from 'recompose/compose';

import { InjectedProps } from 'app/containers/TaskGroup';

export interface Aggregate {
  [ group: string ]: {
    completed: number,
    total: number,
  };
}

/**
 * HOC to generate group aggregate completes and totals
 */

export default <TPropsInjected extends InjectedProps>
  ( Component: React.ComponentType<TPropsInjected> ) => 
    ( props: TPropsInjected ) => {
      if ( props.loading ) {
        return <Component { ...props }/>;
      }

      const aggregates: Aggregate = {};
      props.allTasks.forEach( task => {    
        if ( !aggregates.hasOwnProperty( task.group ) ) {
          aggregates[ task.group ] = {
            completed: 0,
            total: 0,
          };
        }
        
        aggregates[ task.group ].completed += task.completedAt ? 1 : 0;
        aggregates[ task.group ].total += 1;
      } );

      return <Component { ...props } aggregates={ aggregates } />;
    };
