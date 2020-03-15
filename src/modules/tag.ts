/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import { Resolvers, Tag, TagCreateInput, TagUpdateInput } from '../generated'
import { gql } from '../noop-gql'
import { ID, ModuleContext } from '../types'

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

  extend type Mutation {
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

const resolvers: Resolvers<ModuleContext<{ tagAPI: TagAPI }>> = {
  Mutation: {
    createTag: async (root, { data }, { dataSources }, info) => dataSources.tagAPI.createTag(data),

    updateTag: async (root, { tag_id, data }, { dataSources }, info) =>
      dataSources.tagAPI.updateTag(tag_id, data),

    deleteTag: async (root, { tag_id }, { dataSources }, info) =>
      dataSources.tagAPI.deleteTag(tag_id),
  },
}

export const tagModule = {
  typeDefs,
  resolvers,
  dataSources: {
    TagAPI,
  },
}
