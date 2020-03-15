import { NowRequest, NowResponse } from '@now/node'
import { ApolloServer, Config, IResolvers } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { dataSources, resolvers, typeDefs } from './api'
import { context } from './context'

const query = /* GraphQL */ `
  # 1) Provide AUTH_TOKEN in HTTP HEADERS
  # 2) Write your query or mutation

  query Me {
    user {
      fullname
    }
  }
`

const serverConfig: Config = {
  typeDefs,
  // assertion beacuse of missing index signatures and partialis of generated Resolvers
  resolvers: (resolvers as unknown) as IResolvers,
  dataSources,
  context,
  playground: {
    title: 'Toggl GraphQL API',
    tabs: [
      {
        endpoint: '/',
        query,
        headers: { Authorization: 'Bearer AUTH_TOKEN' },
      },
    ],
  },
  introspection: true,
  debug: process.env.NODE_END === 'development',
}

const server = new ApolloServer(serverConfig)

const instance = express()

server.applyMiddleware({ app: instance, path: '/' })

export { server, instance }

export default async (req: NowRequest, res: NowResponse) => {
  return instance(req, res)
}
