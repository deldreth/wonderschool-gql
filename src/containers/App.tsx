import { hot } from 'react-hot-loader';

import React from 'react';

import { Route } from 'react-router-dom';
import styled from 'styled-components';

import TaskGroup from 'app/containers/TaskGroup';
import TaskList from 'app/containers/TaskList';

function App () {
  return (
    <AppContainer>
      <Route path="/" component={ TaskGroup }/>
      <Route path="/group/:group" component={ TaskList }/>
    </AppContainer>
  );
}

export default hot( module )( App );

const AppContainer = styled.div`
  display: flex;
`;
