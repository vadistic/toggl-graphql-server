/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import { Group, GroupCreateInput, GroupUpdateInput, Resolvers } from '../generated'
import { gql } from '../noop-gql'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md

const typeDefs = gql`
  type Group {
    "Unique ID of the group"
    id: ID!
    "The name of the group (unique in workspace)"
    name: String!
    "workspace ID, where the group will be used"
    wid: ID!
    "indicates the time group was last updated"
    at: DateTime!
  }

  input GroupCreateInput {
    name: String!
    wid: ID!
  }

  input GroupUpdateInput {
    name: String!
  }

  extend type Mutation {
    createGroup(data: GroupCreateInput!): Group!
    updateGroup(group_id: ID!, data: GroupUpdateInput!): Group!
    deleteGroup(group_id: ID!): Boolean!
  }
`

export class WorkspaceGroupAPI extends DataSource {
  // add custom get group by id?

  async createGroup(data: GroupCreateInput): Promise<Group> {
    return this.post(`groups`, { project: data }).then(res => res.data)
  }

  async updateGroup(group_id: ID, data: GroupUpdateInput): Promise<Group> {
    return this.put(`groups/${group_id}`, { project: data }).then(res => res.data)
  }

  async deleteGroup(group_id: ID): Promise<boolean> {
    return this.delete(`groups/${group_id}`).then(res => !!res)
  }
}

const resolvers: Resolvers<ModuleContext<{ workspaceGroupAPI: WorkspaceGroupAPI }>> = {
  Mutation: {
    createGroup: async (root, { data }, { dataSources }, info) =>
      dataSources.workspaceGroupAPI.createGroup(data),

    updateGroup: async (root, { group_id, data }, { dataSources }, info) =>
      dataSources.workspaceGroupAPI.updateGroup(group_id, data),

    deleteGroup: async (root, { group_id }, { dataSources }, info) =>
      dataSources.workspaceGroupAPI.deleteGroup(group_id),
  },
}

export const workspaceGroupModule = {
  typeDefs,
  resolvers,
  dataSources: { WorkspaceGroupAPI },
}
