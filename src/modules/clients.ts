import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import {
  QueryResolvers,
  MutationResolvers,
  Maybe,
  Client,
  ClientCreateInput,
  ClientUpdateInput,
  Project,
  ClientResolvers,
} from '../generated'
import { DataSource } from '../data-source'
import { ID } from '../types'
import { SharedModule } from './shared'
import { ProjectModule } from './project'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md

const typeDefs = gql`
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

    "active: possible values true/false/both. By default true. If false, only archived projects are returned"
    projects(active: String): [Project!]!
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

  type Query {
    client(client_id: ID!): Client
    clients: [Client!]!
  }

  type Mutation {
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

  async getClientProjects(client_id: ID, active?: string): Promise<Project[]> {
    return this.get(`clients/${client_id}/projects`)
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

const Query: QueryResolvers<ModuleContext> = {
  client: async (root, { client_id }, { injector }, info) =>
    injector.get(ClientAPI).getClient(client_id),
  clients: async (root, args, { injector }, info) => injector.get(ClientAPI).getClients(),
}

const Mutation: MutationResolvers<ModuleContext> = {
  createClient: async (root, { data }, { injector }, info) =>
    injector.get(ClientAPI).createClient(data),
  updateClient: async (root, { client_id, data }, { injector }, info) =>
    injector.get(ClientAPI).updateClient(client_id, data),
  deleteClient: async (root, { client_id }, { injector }, info) =>
    injector.get(ClientAPI).deleteClient(client_id),
}

const Client: ClientResolvers = {
  projects: async (root, { active }, { injector }, info) =>
    injector.get(ClientAPI).getClientProjects(root.id, active),
}

export const ClientModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule, ProjectModule],
  providers: [ClientAPI],
  resolvers: {
    Query,
    Mutation,
  },
})
