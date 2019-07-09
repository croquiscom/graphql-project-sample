import { Request } from '@croquiscom/crary-express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, DocumentNode, ExecutionArgs, Kind } from 'graphql';
import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
import '../models';

const schema = buildSchema(`
type Query {
  hello: String!
}
`);

function getOperationName(document: DocumentNode): string | null {
  if (!document) {
    return null;
  }
  for (const definition of document.definitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      if (definition.name) {
        return definition.name.value;
      }
      const selections = definition.selectionSet.selections;
      for (const selection of selections) {
        if (selection.kind === Kind.FIELD) {
          return selection.name.value;
        }
      }
    }
  }
  return null;
}

type Diff<T, U> = T extends U ? never : T;
interface Context {
  body: Request['body'];
  req: Request;
  res: Diff<Request['res'], undefined>;
}

class LogHelperExtension implements GraphQLExtension {
  executionDidStart({ executionArgs }: { executionArgs: ExecutionArgs }) {
    const context: Context = executionArgs.contextValue;
    const operation_name = executionArgs.operationName || getOperationName(executionArgs.document);

    context.body.operationName = operation_name;
    // compact spaces/newlines for query statement log
    context.body.query = context.body.query.replace(/\s+/g, ' ');

    if (operation_name === 'IntrospectionQuery') {
      context.req.skip_logging = true;
    }

    // add operationName to log's URL(/graphql) part
    if (operation_name) {
      let url = context.req.originalUrl;
      const pos = url.indexOf('?');
      if (pos >= 0) {
        url = url.substr(0, pos);
      }
      url += '/' + operation_name;
      context.req.originalUrl = url;
    }
  }

  willSendResponse({ graphqlResponse, context }: { graphqlResponse: GraphQLResponse, context: Context }) {
    if (graphqlResponse.http) {
      // add charset
      graphqlResponse.http.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    // add error to log
    if (graphqlResponse.errors && graphqlResponse.errors.length > 0) {
      (context.res as any).error = graphqlResponse.errors[0];
    }
  }
}

class CustomApolloServer extends ApolloServer {
  constructor() {
    super({
      schema,
      context: ({ req }): Context => {
        return { body: req.body, req, res: req.res! };
      },
      extensions: [
        () => new LogHelperExtension(),
      ],
    });
  }
}

export const apollo_server = new CustomApolloServer();
