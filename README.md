GraphQL project sample for croquis.com projects

# Need for Start
1. docker
2. docker-compose
3. npm or yarn

# How to start
1. Start database servers: `./tools/db/start.sh`
2. install [PM2](https://github.com/Unitech/pm2) : `npm install -g pm2 OR yarn global add pm2`
3. Start services: `cd services/user && pm2 start tools/server.js`
4. Run playground: http://localhost:6400/graphql

# Used frameworks/libraries
* [TypeScript](https://www.typescriptlang.org/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [CORMO](http://croquiscom.github.io/cormo/)
* [TypeGraphQL](https://typegraphql.ml/)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Sinon](https://sinonjs.org/)
* [Rinore](https://github.com/croquiscom/rinore)

# Sample queries

## Create a user
```graphql
mutation {
  createUser(input: {
    full_name: "Test User"
  }) {
    id
    full_name
  }
}
```

## Get users list
```graphql
{
  user_list(full_name_istartswith: "T") {
    item_list {
      id
      full_name
    }
  }
}
```
