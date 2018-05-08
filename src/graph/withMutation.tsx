import React from 'react';

import { DocumentNode } from 'graphql';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';

export default <TPropsExternal, TPropsInjected>( mutation: DocumentNode, 
                                                 name: string ) => 
  ( Component: React.ComponentType ) => 
    ( props: TPropsExternal & TPropsInjected ) => {
      const ComponentWithMutation = compose(
        graphql( mutation, { name } ),
      )( Component );

      return <ComponentWithMutation { ...props } />;
    };
