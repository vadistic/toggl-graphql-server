/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import {
  InvitationResponse,
  Resolvers,
  WorkspaceUser,
  WorkspaceUserInviteInput,
  WorkspaceUserUpdateInput,
} from '../generated'
import { gql } from '../noop-gql'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspace_users.md

const typeDefs = gql`
  type WorkspaceUser {
    id: ID!
    "user id of the workspace user"
    uid: ID!
    "if user is workspace admin"
    admin: Boolean!
    "if the workspace user has accepted the invitation to this workspace"
    active: Boolean!
    "if user has not accepted the invitation the url for accepting his/her invitation is sent when the request is made by workspace admin"
    invite_url: String
  }

  input WorkspaceUserInviteInput {
    emails: [String!]!
  }

  type InvitationResponse {
    workspace_users: [WorkspaceUser!]!
    notifications: [String!]!
  }

  """
  Only the admin flag can be changed.
  """
  input WorkspaceUserUpdateInput {
    admin: Boolean!
  }

  extend type Mutation {
    inviteWorkspaceUser(workspace_id: ID!, data: WorkspaceUserInviteInput!): InvitationResponse!
    updateWorkspaceUser(workspace_user_id: ID!, data: WorkspaceUserUpdateInput!): WorkspaceUser!
    deleteWorkspaceUser(workspace_user_id: ID!): Boolean!
  }
`

class WorkspaceUserAPI extends DataSource {
  async getWorkspaceUsers(workspace_id: ID): Promise<WorkspaceUser[]> {
    return this.get(`workspaces/${workspace_id}/workspace_users`)
  }

  async inviteWorkspaceUser(
    workspace_id: ID,
    data: WorkspaceUserInviteInput,
  ): Promise<InvitationResponse> {
    return this.post(`workspaces/${workspace_id}/invite`, data).then(res => ({
      workspace_users: res.data,
      notifications: res.notifications,
    }))
  }

  async updateWorkspaceUser(
    workspace_user_id: ID,
    data: WorkspaceUserUpdateInput,
  ): Promise<WorkspaceUser> {
    return this.put(`workspace_users/${workspace_user_id}`, { workspace_user: data }).then(
      res => res.data,
    )
  }

  async deleteWorkspaceUser(workspace_user_id: ID): Promise<boolean> {
    return this.delete(`workspace_users/${workspace_user_id}`).then(res => !!res)
  }
}

const resolvers: Resolvers<ModuleContext<{ workspaceUserAPI: WorkspaceUserAPI }>> = {
  Mutation: {
    inviteWorkspaceUser: async (root, { workspace_id, data }, { dataSources }, info) =>
      dataSources.workspaceUserAPI.inviteWorkspaceUser(workspace_id, data),

    updateWorkspaceUser: async (root, { workspace_user_id, data }, { dataSources }, info) =>
      dataSources.workspaceUserAPI.updateWorkspaceUser(workspace_user_id, data),

    deleteWorkspaceUser: async (root, { workspace_user_id }, { dataSources }, info) =>
      dataSources.workspaceUserAPI.deleteWorkspaceUser(workspace_user_id),
  },
  Workspace: {
    users: async (root, args, { dataSources }, info) =>
      dataSources.workspaceUserAPI.getWorkspaceUsers(root.id),
  },
}

export const workspaceUserModule = {
  typeDefs,
  resolvers,
  dataSources: {
    WorkspaceUserAPI,
  },
}
