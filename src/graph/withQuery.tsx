import React from 'react';

import { DocumentNode } from 'graphql';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';

export default <TPropsExternal, TPropsInjected>
  ( query: DocumentNode, options?: { [ key: string ]: any } ) => 
    ( Component: React.ComponentType ) => 
      ( props: TPropsExternal & TPropsInjected ) => {
        const ComponentWithQuery = compose(
          graphql( query, {
            options,
            props: ( { ownProps, data } ) => ( {
              ...ownProps,
              ...data,
            } ),
          } ),
        )( Component );

        return <ComponentWithQuery { ...props } />;
      };
