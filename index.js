const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const graphqlResolverPromise = require('./resolvers');

const server = express();
const PORT = process.env.PORT || 5000;

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const generateSchemaFunc = async () => {
  let graphqlResolver = await graphqlResolverPromise()

  const schema = makeExecutableSchema({
  typeDefs: loadSchemaSync('schemas/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: graphqlResolver,
  });

  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
}

server.use((req, res, next) => {
  // extract token from req headers
  const token = req.header('Authorization') || 'fake';

  // TODO: verify token

  // TODO: bind user to req

  // we can later access isAuthenticated property
  // in resolver functions to check
  // if the user is authenticated
  req.isAuthenticated = Boolean(token);

  // call the next middleware
  // whether the user is authenticated or not
  next();
});

generateSchemaFunc()

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));