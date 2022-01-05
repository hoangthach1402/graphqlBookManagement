const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

// Load Schema and resolver
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load DBMEthod
const mongooseDataMethods = require('./data/db')
// Conenct to mongoose
const MONGO_URI =
  'mongodb+srv://hoangthach1402:hoangthach123@tutorialgraphql.u1wdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`mongoose connected`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

const app = express()

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongooseDataMethods }),
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
}
startServer()

app.listen({ port: 4000 }, () => {
  console.log(`server is running on PORT :4000`)
})
