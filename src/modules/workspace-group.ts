import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import { MutationResolvers, Group, GroupCreateInput, GroupUpdateInput } from '../generated'
import { DataSource } from '../data-source'
import { ID } from '../types'
import { SharedModule } from '.'

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

  type Mutation {
    createGroup(data: GroupCreateInput!): Group!
    updateGroup(group_id: ID!, data: GroupUpdateInput!): Group!
    deleteGroup(group_id: ID!): Boolean!
  }
`

export class GroupAPI extends DataSource {
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

const Mutation: MutationResolvers<ModuleContext> = {
  createGroup: async (root, { data }, { injector }, info) =>
    injector.get(GroupAPI).createGroup(data),

  updateGroup: async (root, { group_id, data }, { injector }, info) =>
    injector.get(GroupAPI).updateGroup(group_id, data),

  deleteGroup: async (root, { group_id }, { injector }, info) =>
    injector.get(GroupAPI).deleteGroup(group_id),
}

export const WorkspaceGroupModule = new GraphQLModule({
  typeDefs,
  providers: [GroupAPI],
  imports: [SharedModule],
  resolvers: {
    Mutation,
  },
})
