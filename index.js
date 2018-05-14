import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

const graphqlEndpoint = '/graphql';
// bodyParser is needed just for POST.
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ 
    schema, 
    context: {
        models,
    } 
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

// sync() will create all table if they doesn't exist in database
// {force: true} in sync drops the database
models.sequelize.sync({}).then(() => {
    app.listen(8080);
})