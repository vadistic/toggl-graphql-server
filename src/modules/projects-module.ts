import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import {
  QueryResolvers,
  MutationResolvers,
  MutationCreateProjectArgs,
  ProjectCreateInput,
  Maybe,
  Project,
  ProjectUpdateInput,
} from '../generated/graphql'
import { SharedModule } from './shared-module'
import { DataSource } from '../data-source'
import { AuthModule } from './auth-module'

const typeDefs = gql`
  # https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md
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
    project(where: WhereUniqueId!): Project
  }

  type Mutation {
    createProject(data: ProjectCreateInput!): Project!
    updateProject(where: WhereUniqueId!, data: ProjectUpdateInput!): Project!
    deleteProject(where: WhereUniqueId!): [ID!]!
  }
`

export class ProjectSource extends DataSource {
  async getProject(id: string): Promise<Maybe<Project>> {
    return this.get(`projects/${id}`).then(res => res.data)
  }

  async createProject(data: ProjectCreateInput): Promise<Project> {
    return this.post(`projects`, { project: data }).then(res => res.data)
  }

  async updateProject(data: ProjectUpdateInput, id: string): Promise<Project> {
    return this.put(`projects/${id}`, { project: data }).then(res => res.data)
  }

  async deleteProject(id: string): Promise<string[]> {
    return this.delete(`projects/${id}`).then(res => res.data)
  }
}

const Query: QueryResolvers<ModuleContext> = {
  project: async (root, { where: { id } }, { injector }, info) =>
    injector.get(ProjectSource).getProject(id),
}

const Mutation: MutationResolvers<ModuleContext> = {
  createProject: async (root, { data }, { injector }, info) =>
    injector.get(ProjectSource).createProject(data),

  updateProject: async (root, { where: { id }, data }, { injector }, info) =>
    injector.get(ProjectSource).updateProject(data, id),

  deleteProject: async (root, { where: { id } }, { injector }, info) =>
    injector.get(ProjectSource).deleteProject(id),
}

export const ProjectsModule = new GraphQLModule({
  typeDefs,
  providers: [ProjectSource],
  imports: [SharedModule, AuthModule],
  resolvers: {
    Query,
    Mutation,
  },
})
