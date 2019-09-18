import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-micro'
import { GraphQLModule } from '@graphql-modules/core'

import { TaskModule } from './modules/task'
import { TagModule } from './modules/tag'
import { UserModule } from './modules/user'
import { WorkspaceModule } from './modules/workspace'
import { ClientModule } from './modules/clients'
import { TimeEntriesModule } from './modules/time-entries'

const AppModule = new GraphQLModule({
  imports: [TaskModule, TagModule, UserModule, WorkspaceModule, ClientModule, TimeEntriesModule],
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
