import React from 'react';

import { Query } from 'react-apollo';
import compose from 'recompose/compose';

import { InjectedProps } from 'app/containers/TaskGroup';

/**
 * HOC to generate task groups
 */

export default <TPropsInjected extends InjectedProps>
  ( Component: React.ComponentType<TPropsInjected> ) => 
    ( props: TPropsInjected ) => {
      if ( props.loading ) {
        return <Component { ...props }/>;
      }

      const groups: string[] = [];
      props.allTasks.forEach( task => {
        if ( !groups.includes( task.group ) ) {
          groups.push( task.group );
        }
      } );

      return <Component { ...props } groups={ groups } />;
    };
