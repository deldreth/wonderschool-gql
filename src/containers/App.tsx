import { hot } from 'react-hot-loader';

import * as React from 'react';

const Loadable = require( 'react-loadable' );
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const AsyncTaskGroup = Loadable( {
  loader: () => import( /* webpackChunkName: "task-group" */ './TaskGroup' ),
  loading() {
    return <div>Loading...</div>;
  },
} );

const AsyncTaskList = Loadable( {
  loader: () => import( /* webpackChunkName: "task-list" */ './TaskList' ),
  loading() {
    return <div>Loading...</div>;
  },
} );

const App = () =>
  (
    <AppContainer>
      <Route path="/" component={ AsyncTaskGroup }/>
      <Route path="/group/:group" component={ AsyncTaskList }/>
    </AppContainer>
  );

export default hot( module )( App );

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;

  max-width: 768px;
  margin: 0px 16px 0px 16px;

  @media only screen and (min-width: 768px) {
    column-gap: 32px;
    max-width: 992px;
    margin: 0px auto 0px auto;
  }
`;
