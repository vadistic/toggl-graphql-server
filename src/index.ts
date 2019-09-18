import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-micro'
import { GraphQLModule } from '@graphql-modules/core'

import { TaskModule, UserModule, WorkspacModule, ClientModule, TagModule } from './modules'

const AppModule = new GraphQLModule({
  imports: [TaskModule, TagModule, UserModule, WorkspacModule, ClientModule, TaskModule],
})

const server = new ApolloServer({
  modules: [AppModule],
  context: session => session,
  introspection: true,
  debug: true,
  playground: true,
})

const graphqlPath = '/'
const graphqlHandler = server.createHandler({ path: graphqlPath })

module.exports = graphqlHandler
