import 'reflect-metadata';

import { Request } from '@croquiscom/crary-express';
import { ApolloServer } from 'apollo-server-express';
import { DocumentNode, ExecutionArgs, Kind, printSchema } from 'graphql';
import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '../resolvers';
import { Context } from '../types';

export const schema = buildSchemaSync({
  resolvers,
  validate: false,
});

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
interface ContextApollo extends Context {
  body: Request['body'];
  req: Request;
  res: Diff<Request['res'], undefined>;
}

class LogHelperExtension implements GraphQLExtension {
  executionDidStart({ executionArgs }: { executionArgs: ExecutionArgs }) {
    const context: ContextApollo = executionArgs.contextValue;
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

  willSendResponse({ graphqlResponse, context }: { graphqlResponse: GraphQLResponse, context: ContextApollo }) {
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
      context: ({ req }): ContextApollo => {
        return {
          body: req.body, req, res: req.res!,
          loader: {},
        };
      },
      extensions: [
        () => new LogHelperExtension(),
      ],
    });
  }
}

export const apollo_server = new CustomApolloServer();

export function getSchemaString() {
  return printSchema(schema).replace(/.*_placeholder: Boolean\n/g, '');
}
