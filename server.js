const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

const app = express();

// Allow cross-origin resource sharing
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, 
}));

// Source compiled react page
app.use(express.static('public'));

// Redirect to the public folder whenever someone navigates away from index
app.get('*', (req, res) => res.sendFile(path.relative(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => console.log(`app now running on port ${PORT}`));