import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from 'app/containers/App';
import client from 'app/graph/client';

ReactDOM.render(
  <Router>
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById( 'root' ),
);
