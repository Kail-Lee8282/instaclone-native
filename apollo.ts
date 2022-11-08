import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const loginUserIn = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN, token);

    isLoggedInVar(true);
    tokenVar(token);
  } catch (e) {}
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

// const httpLink = createHttpLink({
//   uri: "http://www.wishhive.co.kr:4000/graphql",
// });

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://www.wishhive.co.kr:4000/graphql",
    connectionParams: () => ({
      token: tokenVar(),
    }),
  })
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const uploadHttpLink = createUploadLink({
  uri: "http://www.wishhive.co.kr:4000/graphql",
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("Graphql Err", graphQLErrors);
  }
  if (networkError) {
    console.log("Graphql Err", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: {
          keyArgs: false,
          merge(existing = [], incoming = []) {
            return [...existing, ...incoming];
          },
        },
      },
    },
    Message: {
      fields: {
        user: {
          merge: true,
        },
      },
    },
    // Room: {
    //   fields: {
    //     messages: {
    //       merge(existing = [], incomming = []) {
    //         return [...existing, ...incomming];
    //       },
    //     },
    //   },
    // },
  },
});

// httpLink 는 마지막 링크로 해야함
const allHttpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // subscription이 true 일때 wsLink 실행
  allHttpLinks // subscription이 false 일때 httpLink 실행
);

//localtunnel
const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
