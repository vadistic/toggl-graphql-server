/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import {
  Maybe,
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
  Resolvers,
  Scalars,
  Task,
} from '../generated'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md

const typeDefs = /* GraphQL */ `
  type Project {
    id: ID!

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

    # RELATIONS

    users: [ProjectUser]
    tasks: [Task]
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

  extend type Query {
    project(project_id: ID!): Project
  }

  extend type Mutation {
    createProject(data: ProjectCreateInput!): Project!
    updateProject(project_id: ID!, data: ProjectUpdateInput!): Project!
    deleteProject(project_id: ID!): [ID!]!
  }
`

export class ProjectAPI extends DataSource {
  async getProject(project_id: ID): Promise<Maybe<Project>> {
    return this.get(`projects/${project_id}`).then(res => res.data)
  }

  async getProjectTasks(project_id: ID): Promise<Maybe<Task[]>> {
    return this.get(`projects/${project_id}/tasks`)
  }

  async createProject(data: ProjectCreateInput): Promise<Project> {
    return this.post(`projects`, { project: data }).then(res => res.data)
  }

  async updateProject(project_id: ID, data: ProjectUpdateInput): Promise<Project> {
    return this.put(`projects/${project_id}`, { project: data }).then(res => res.data)
  }

  async deleteProject(project_id: ID): Promise<Scalars['ID'][]> {
    return this.delete(`projects/${project_id}`).then(res => res.data)
  }
}

const resolvers: Resolvers<ModuleContext<{ projectAPI: ProjectAPI }>> = {
  Query: {
    project: async (root, { project_id }, { dataSources }, info) =>
      dataSources.projectAPI.getProject(project_id),
  },
  Mutation: {
    createProject: async (root, { data }, { dataSources }, info) =>
      dataSources.projectAPI.createProject(data),

    updateProject: async (root, { project_id, data }, { dataSources }, info) =>
      dataSources.projectAPI.updateProject(project_id, data),

    deleteProject: async (root, { project_id }, { dataSources }, info) =>
      dataSources.projectAPI.deleteProject(project_id),
  },
  Project: {
    tasks: async (root, args, { dataSources }, info) =>
      dataSources.projectAPI.getProjectTasks(root.id),
  },
}

export const projectModule = {
  typeDefs,
  resolvers,
  dataSources: {
    ProjectAPI,
  },
}
