import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import { DataSource } from '../data-source'
import { ID } from '../types'
import {
  WorkspaceUserInviteInput,
  InvitationResponse,
  MutationResolvers,
  WorkspaceUserUpdateInput,
  WorkspaceUser,
  WorkspaceResolvers,
} from '../generated'
import { SharedModule } from './shared'

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

  type Mutation {
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
    return this.post(`workspaces/${workspace_id}/invite`).then(res => ({
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

const Mutation: MutationResolvers<ModuleContext> = {
  inviteWorkspaceUser: async (root, { workspace_id, data }, { injector }, info) =>
    injector.get(WorkspaceUserAPI).inviteWorkspaceUser(workspace_id, data),

  updateWorkspaceUser: async (root, { workspace_user_id, data }, { injector }, info) =>
    injector.get(WorkspaceUserAPI).updateWorkspaceUser(workspace_user_id, data),

  deleteWorkspaceUser: async (root, { workspace_user_id }, { injector }, info) =>
    injector.get(WorkspaceUserAPI).deleteWorkspaceUser(workspace_user_id),
}

const Workspace: WorkspaceResolvers<ModuleContext> = {
  users: async (root, args, { injector }, info) =>
    injector.get(WorkspaceUserAPI).getWorkspaceUsers(root.id),
}

export const WorkspaceUserModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule],
  providers: [WorkspaceUserAPI],
  resolvers: {
    Mutation,
    Workspace,
  },
})
