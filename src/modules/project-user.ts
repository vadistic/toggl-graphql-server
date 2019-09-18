import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import { DataSource } from '../data-source'
import {
  MutationResolvers,
  ProjectResolvers,
  ProjectUser,
  ProjectUserCreateInput,
  ProjectUserCreateManyInput,
  ProjectUserUpdateManyInput,
  ProjectUserUpdateInput,
} from '../generated'
import { ID } from '../types'
import { SharedModule } from './shared'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md

// TODO: check if this weridness with "fields: fullname" is fixed in v9

const typeDefs = gql`
  type ProjectUser {
    id: ID!
    "project ID"
    pid: ID!
    "user ID, who is added to the project"
    uid: ID!
    "workspace ID, where the project belongs to"
    wid: ID!
    "admin rights for this project"
    manager: Boolean!
    """
    hourly rate for the project user,
    only for pro workspaces,
    in the currency of the project's client or in workspace default currency.
    """
    rate: Float
    "when the project user was last updated"
    at: DateTime!
  }

  input ProjectUserCreateInput {
    "project ID"
    pid: ID!
    "user ID"
    uid: ID!
    "workspace id"
    wid: ID!
    "admin rights for this project (default false"
    manager: Boolean
    "hourly rate for project user (only for pro workspaces, in the workspace currency)"
    rate: Float
  }

  input ProjectUserUpdateInput {
    "project ID"
    pid: ID!
    "user ID"
    uid: ID!
    "admin rights for this project (default false"
    manager: Boolean
    "hourly rate for project user (only for pro workspaces, in the workspace currency)"
    rate: Float
  }

  input ProjectUserCreateManyInput {
    "project ID"
    pid: ID!
    "user ID"
    uid: [ID!]!
    "workspace id"
    wid: ID!
    "admin rights for this project (default false"
    manager: Boolean
    "hourly rate for project user (only for pro workspaces, in the workspace currency)"
    rate: Float
  }

  input ProjectUserUpdateManyInput {
    "admin rights for this project (default false"
    manager: Boolean
    "hourly rate for project user (only for pro workspaces, in the workspace currency)"
    rate: Float
  }

  type Mutation {
    createProjectUser(data: ProjectUserCreateInput!): ProjectUser!
    updateProjectUser(project_user_id: ID!, data: ProjectUserUpdateInput!): ProjectUser!
    deleteProjectUser(project_user_id: ID!): Boolean!

    # skipping 'Get list of project users in a Workspace since one can just check each project'

    createManyProjectUsers(data: ProjectUserCreateManyInput!): [ProjectUser!]!
    updateManyProjectUsers(
      project_user_ids: [ID!]!
      data: ProjectUserUpdateManyInput!
    ): [ProjectUser!]!
    deleteManyProjectUsers(project_user_ids: [ID!]!): Boolean!
  }
`

class ProjectUserAPI extends DataSource {
  async getProjectUsers(project_id: ID): Promise<ProjectUser[]> {
    return this.get(`projects/${project_id}/project_users`)
  }

  async createProjectUser(data: ProjectUserCreateInput): Promise<ProjectUser> {
    return this.post(`project_users`, data).then(res => res.data)
  }

  async updateProjectUser(project_user_id: ID, data: ProjectUserUpdateInput): Promise<ProjectUser> {
    return this.put(`project_users/${project_user_id}`, data).then(res => res.data)
  }

  async deleteProjectUser(project_user_id: ID): Promise<boolean> {
    return this.delete(`project_users/${project_user_id}`).then(res => !!res)
  }

  async createManyProjectUsers(data: ProjectUserCreateManyInput): Promise<ProjectUser[]> {
    return this.post(`project_users`, data).then(res => res.data)
  }

  async updateManmyProjectUsers(
    project_user_ids: ID[],
    data: ProjectUserUpdateManyInput,
  ): Promise<ProjectUser[]> {
    return this.put(`project_users/${project_user_ids.join(',')}`, data).then(res => res.data)
  }

  async deleteManyProjectUsers(project_user_ids: ID[]): Promise<boolean> {
    return this.delete(`project_users/${project_user_ids.join(',')}`).then(res => !!res)
  }
}

const Mutation: MutationResolvers<ModuleContext> = {
  createProjectUser: async (root, { data }, { injector }, info) =>
    injector.get(ProjectUserAPI).createProjectUser(data),

  updateProjectUser: async (root, { project_user_id, data }, { injector }, info) =>
    injector.get(ProjectUserAPI).updateProjectUser(project_user_id, data),

  deleteProjectUser: async (root, { project_user_id }, { injector }, info) =>
    injector.get(ProjectUserAPI).deleteProjectUser(project_user_id),

  createManyProjectUsers: async (root, { data }, { injector }, info) =>
    injector.get(ProjectUserAPI).createManyProjectUsers(data),

  updateManyProjectUsers: async (root, { project_user_ids, data }, { injector }, info) =>
    injector.get(ProjectUserAPI).updateManmyProjectUsers(project_user_ids, data),

  deleteManyProjectUsers: async (root, { project_user_ids }, { injector }, info) =>
    injector.get(ProjectUserAPI).deleteManyProjectUsers(project_user_ids),
}

const Project: ProjectResolvers<ModuleContext> = {
  users: async (root, args, { injector }, info) =>
    injector.get(ProjectUserAPI).getProjectUsers(root.id),
}

export const ProjectUserModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule],
  providers: [ProjectUserAPI],
  resolvers: {
    Mutation,
    Project,
  },
})
