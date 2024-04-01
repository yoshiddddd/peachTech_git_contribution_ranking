import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const endpoint = "https://api.github.com/graphql";

const httpLink = new HttpLink({ uri: endpoint });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return forward(operation);
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
