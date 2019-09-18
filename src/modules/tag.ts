import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'

import { MutationResolvers, Tag, TagCreateInput, TagUpdateInput } from '../generated'
import { DataSource } from '../data-source'
import { ID } from '../types'
import { SharedModule } from './shared'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md

const typeDefs = gql`
  type Tag {
    "Unique ID of the tag"
    id: ID!
    "The name of the tag (unique in workspace)"
    name: String!
    "workspace ID, where the tag will be used"
    wid: ID!
  }

  input TagCreateInput {
    name: String!
    wid: ID!
  }

  input TagUpdateInput {
    name: String!
  }

  type Mutation {
    createTag(data: TagCreateInput!): Tag!
    updateTag(tag_id: ID!, data: TagUpdateInput!): Tag!
    deleteTag(tag_id: ID!): Boolean!
  }
`

export class TagAPI extends DataSource {
  // add custom get tag by id?

  async createTag(data: TagCreateInput): Promise<Tag> {
    return this.post(`tags`, { project: data }).then(res => res.data)
  }

  async updateTag(tag_id: ID, data: TagUpdateInput): Promise<Tag> {
    return this.put(`tags/${tag_id}`, { project: data }).then(res => res.data)
  }

  async deleteTag(tag_id: ID): Promise<boolean> {
    return this.delete(`tags/${tag_id}`).then(res => !!res)
  }
}

const Mutation: MutationResolvers<ModuleContext> = {
  createTag: async (root, { data }, { injector }, info) => injector.get(TagAPI).createTag(data),

  updateTag: async (root, { tag_id, data }, { injector }, info) =>
    injector.get(TagAPI).updateTag(tag_id, data),

  deleteTag: async (root, { tag_id }, { injector }, info) => injector.get(TagAPI).deleteTag(tag_id),
}

export const TagModule = new GraphQLModule({
  typeDefs,
  providers: [TagAPI],
  imports: [SharedModule],
  resolvers: {
    Mutation,
  },
})
