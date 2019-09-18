import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import {
  MutationResolvers,
  Scalars,
  Tag,
  UniqueIdInput,
  TagCreateInput,
  TagUpdateInput,
} from '../generated/graphql'
import { SharedModule } from './shared-module'
import { DataSource, AuthModule } from '../data-source'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md

const typeDefs = gql`
  type Tag {
    "Unique ID of the tag (integer, required)"
    id: ID!
    "The name of the tag (string, required, unique in workspace)"
    name: String!
    "workspace ID, where the tag will be used (integer, required)"
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
    updateTag(where: UniqueIdInput!, data: TagUpdateInput!): Tag!
    deleteTag(where: UniqueIdInput!): [ID!]!
  }
`

export class TagsAPI extends DataSource {
  // add custom get tag

  async createTag(data: TagCreateInput): Promise<Tag> {
    return this.post(`projects`, { project: data }).then(res => res.data)
  }

  async updateTag({ id }: UniqueIdInput, data: TagUpdateInput): Promise<Tag> {
    return this.put(`projects/${id}`, { project: data }).then(res => res.data)
  }

  async deleteTag({ id }: UniqueIdInput): Promise<Scalars['ID'][]> {
    return this.delete(`projects/${id}`).then(res => res.data)
  }
}

const Mutation: MutationResolvers<ModuleContext> = {
  createTag: async (root, { data }, { injector }, info) => injector.get(TagsAPI).createTag(data),

  updateTag: async (root, { where, data }, { injector }, info) =>
    injector.get(TagsAPI).updateTag(where, data),

  deleteTag: async (root, { where }, { injector }, info) => injector.get(TagsAPI).deleteTag(where),
}

export const TagsModule = new GraphQLModule({
  typeDefs,
  providers: [TagsAPI],
  imports: [SharedModule, AuthModule],
  resolvers: {
    Mutation,
  },
})
