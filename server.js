const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
require('dotenv').config()

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, 
}));

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => console.log(`app now running on port ${PORT}`));