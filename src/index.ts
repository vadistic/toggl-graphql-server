import 'reflect-metadata'

import { ApolloServer, gql } from 'apollo-server-micro'
import { ProjectsModule } from './modules/projects-module'

const server = new ApolloServer({
  modules: [ProjectsModule],
  context: session => session,
  introspection: true,
  debug: true,
  playground: true,
})

const graphqlPath = '/'
const graphqlHandler = server.createHandler({ path: graphqlPath })

module.exports = graphqlHandler
