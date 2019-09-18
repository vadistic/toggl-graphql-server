import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-micro'
import { ProjectsModule } from './modules/projects-module'
import { TagsModule } from './modules/tags-module'
import { GraphQLModule } from '@graphql-modules/core'
import { UsersModule } from './modules/users-module'
import { WorkspacesModule } from './modules/workspace-module'

const AppModule = new GraphQLModule({
  imports: [ProjectsModule, TagsModule, UsersModule, WorkspacesModule],
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
