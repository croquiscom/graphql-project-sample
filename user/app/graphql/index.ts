import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Query {
  hello: String!
}
`);

class CustomApolloServer extends ApolloServer {
  constructor() {
    super({
      schema,
    });
  }
}

export const apollo_server = new CustomApolloServer();
