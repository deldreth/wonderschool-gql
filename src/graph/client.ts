import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient( {
  cache: new InMemoryCache(),
  link: ApolloLink.from( [
    new HttpLink( {
      uri: 'http://localhost:3000',
    } ),
  ] ),
} );

export default client;
