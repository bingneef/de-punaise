import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, from } from 'apollo-link'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { API_PATH } from 'react-native-dotenv'
const httpLink = createPersistedQueryLink().concat(createHttpLink({ uri: API_PATH }))

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'testtest',
    }
  }))

  return forward(operation)
})


export const client = new ApolloClient({
  link: from([
    authMiddleware,
    httpLink
  ]),
  cache: new InMemoryCache(),
})
