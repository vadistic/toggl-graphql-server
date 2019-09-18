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
  Task,
  ProjectResolvers,
} from '../generated'
import { DataSource } from '../data-source'
import { ID } from '../types'
import { SharedModule } from './shared'
import { ProjectUserModule } from './project-user'
import { TaskModule } from './task'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md

const typeDefs = gql`
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

  type Query {
    project(project_id: ID!): Project
  }

  type Mutation {
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

const Query: QueryResolvers<ModuleContext> = {
  project: async (root, { project_id }, { injector }, info) =>
    injector.get(ProjectAPI).getProject(project_id),
}

const Mutation: MutationResolvers<ModuleContext> = {
  createProject: async (root, { data }, { injector }, info) =>
    injector.get(ProjectAPI).createProject(data),

  updateProject: async (root, { project_id, data }, { injector }, info) =>
    injector.get(ProjectAPI).updateProject(project_id, data),

  deleteProject: async (root, { project_id }, { injector }, info) =>
    injector.get(ProjectAPI).deleteProject(project_id),
}

const Project: ProjectResolvers<ModuleContext> = {
  tasks: async (root, args, { injector }, info) =>
    injector.get(ProjectAPI).getProjectTasks(root.id),
}

export const ProjectModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule, ProjectUserModule, TaskModule],
  providers: [ProjectAPI],
  resolvers: {
    Query,
    Mutation,
    Project,
  },
})
