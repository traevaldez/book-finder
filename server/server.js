const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleWare } = require('./utils/auth')
const db = require('./config/connection');

const routes = require('./routes');

// Express Server
const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async(typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });
}

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphgqPath}`);
  });
  
});

startApolloServer(typeDefs, resolvers);