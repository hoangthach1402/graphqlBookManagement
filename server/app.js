const express = require('express')
const { ApolloServer } = require('apollo-server-express')
// Load Schema and resolver
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
// const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
}
startServer()

app.listen({ port: 4000 }, () => {
  console.log(`server is running on PORT :4000`)
})
