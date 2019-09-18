import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import {
  QueryResolvers,
  MutationResolvers,
  ProjectCreateInput,
  Maybe,
  Project,
  ProjectUpdateInput,
  Scalars,
  UniqueIdInput,
} from '../generated/graphql'
import { DataSource, AuthModule } from '../data-source'
import { SharedModule } from './shared-module'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md

const typeDefs = gql`
  type Project {
    "the name of the project (string, required, unique for client and workspace)"
    name: String!
    "workspace ID, where the project will be saved (integer, required)"
    wid: ID!
    "client ID (integer, not required)"
    cid: ID
    "whether the project is archived or not (boolean, by default true)"
    active: Boolean!
    "whether project is accessible for only project users or for all workspace users (boolean, default true)"
    is_private: Boolean!
    "whether the project can be used as a template (boolean, not required)"
    template: Boolean
    "id of the template project used on current project's creation"
    template_id: ID
    "whether the project is billable or not (boolean, default true, available only for pro workspaces)"
    billable: Boolean
    "whether the estimated hours are automatically calculated based on task estimations or manually fixed based on the value of 'estimated_hours' (boolean, default false, not required, premium functionality)"
    auto_estimates: Boolean
    "if auto_estimates is true then the sum of task estimations is returned, otherwise user inserted hours (integer, not required, premium functionality)"
    estimated_hours: Int
    "id of the color selected for the project"
    color: Int
    "hex of project's color"
    hex_color: String
    "hourly rate of the project (float, not required, premium functionality)"
    rate: Float
    "timestamp indicating when the project was last updated (UTC time), read-only"
    at: DateTime!
  }

  input ProjectCreateInput {
    name: String!
    wid: ID!
    cid: ID
    template_id: ID
    is_private: Boolean
  }

  input ProjectUpdateInput {
    name: String
    cid: ID
    is_private: Boolean
    color: Int
  }

  type Query {
    project(where: UniqueIdInput!): Project
  }

  type Mutation {
    createProject(data: ProjectCreateInput!): Project!
    updateProject(where: UniqueIdInput!, data: ProjectUpdateInput!): Project!
    deleteProject(where: UniqueIdInput!): [ID!]!
  }
`

export class ProjectsAPI extends DataSource {
  async getProject({ id }: UniqueIdInput): Promise<Maybe<Project>> {
    return this.get(`projects/${id}`).then(res => res.data)
  }

  async createProject(data: ProjectCreateInput): Promise<Project> {
    return this.post(`projects`, { project: data }).then(res => res.data)
  }

  async updateProject({ id }: UniqueIdInput, data: ProjectUpdateInput): Promise<Project> {
    return this.put(`projects/${id}`, { project: data }).then(res => res.data)
  }

  async deleteProject({ id }: UniqueIdInput): Promise<Scalars['ID'][]> {
    return this.delete(`projects/${id}`).then(res => res.data)
  }
}

const Query: QueryResolvers<ModuleContext> = {
  project: async (root, { where }, { injector }, info) =>
    injector.get(ProjectsAPI).getProject(where),
}

const Mutation: MutationResolvers<ModuleContext> = {
  createProject: async (root, { data }, { injector }, info) =>
    injector.get(ProjectsAPI).createProject(data),

  updateProject: async (root, { where, data }, { injector }, info) =>
    injector.get(ProjectsAPI).updateProject(where, data),

  deleteProject: async (root, { where }, { injector }, info) =>
    injector.get(ProjectsAPI).deleteProject(where),
}

export const ProjectsModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule, AuthModule],
  providers: [ProjectsAPI],
  resolvers: {
    Query,
    Mutation,
  },
})
