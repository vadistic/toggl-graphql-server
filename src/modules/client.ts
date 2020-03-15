/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import {
  Client,
  ClientCreateInput,
  ClientUpdateInput,
  Maybe,
  Project,
  Resolvers,
} from '../generated'
import { ID, ModuleContext, Nullable } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md

const typeDefs = /* GraphQL */ `
  type Client {
    id: ID!
    "the name of the client"
    name: String!
    "workspace ID, where the client will be used"
    wid: ID!
    "notes for the client"
    notes: String
    "indicates the time client was last updated (UTC time)"
    at: DateTime!

    # RELATIONS
    "get client projects - by default both active and unactive"
    projects(active: Boolean): [Project!]!
  }

  input ClientCreateInput {
    name: String!
    wid: ID!
    notes: String
  }

  """
  workspace_id can't be changed!
  """
  input ClientUpdateInput {
    name: String!
    notes: String
  }

  extend type Query {
    client(client_id: ID!): Client
    clients: [Client!]!
  }

  extend type Mutation {
    createClient(data: ClientCreateInput!): Client!
    updateClient(client_id: ID!, data: ClientUpdateInput!): Client!
    deleteClient(client_id: ID!): Boolean!
  }
`

export class ClientAPI extends DataSource {
  async getClient(client_id: ID): Promise<Maybe<Client>> {
    return this.get(`clients/${client_id}`).then(res => res.data)
  }

  async getClients(): Promise<Client[]> {
    return this.get(`clients`)
  }

  async getClientProjects(client_id: ID, active: Nullable<boolean>): Promise<Project[]> {
    return this.get(`clients/${client_id}/projects`, {
      active: active ?? 'both',
    })
  }

  async createClient(data: ClientCreateInput): Promise<Client> {
    return this.post(`clients`, { client: data }).then(res => res.data)
  }

  async updateClient(client_id: ID, data: ClientUpdateInput): Promise<Client> {
    return this.put(`clients/${client_id}`, { client: data }).then(res => res.data)
  }

  async deleteClient(client_id: ID): Promise<boolean> {
    return this.delete(`clients/${client_id}`).then(res => !!res)
  }
}

const resolvers: Resolvers<ModuleContext<{ clientAPI: ClientAPI }>> = {
  Query: {
    client: async (root, { client_id }, { dataSources }, info) =>
      dataSources.clientAPI.getClient(client_id),

    clients: async (root, args, { dataSources }, info) => dataSources.clientAPI.getClients(),
  },
  Mutation: {
    createClient: async (root, { data }, { dataSources }, info) =>
      dataSources.clientAPI.createClient(data),

    updateClient: async (root, { client_id, data }, { dataSources }, info) =>
      dataSources.clientAPI.updateClient(client_id, data),

    deleteClient: async (root, { client_id }, { dataSources }, info) =>
      dataSources.clientAPI.deleteClient(client_id),
  },
  Client: {
    projects: async (root, { active }, { dataSources }, info) =>
      dataSources.clientAPI.getClientProjects(root.id, active),
  },
}

export const clientModule = {
  typeDefs,
  resolvers,
  dataSources: {
    ClientAPI,
  },
}
