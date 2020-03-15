/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import { Group, Maybe, Project, Resolvers, Workspace, WorkspaceUpdateInput } from '../generated'
import { gql } from '../noop-gql'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md

const workspaceFields = /* GraphQL */ `
    "the name of the workspace"
    name: String!
    "(if set, otherwise omited)"
    logo_url: String
    "???"
    profile: Int
    "if it's a pro workspace or not. Shows if someone is paying for the workspace or not"
    premium: Boolean!
    "shows whether currently requesting user has admin access to the workspace"
    admin: Boolean!
    """
    default hourly rate for workspace,
    won't be shown to non-admins if the only_admins_see_billable_rates flag is set to true
    """
    default_hourly_rate: Float
    "default currency for workspace"
    default_currency: String
    "whether only the admins can create projects or everybody"
    only_admins_may_create_projects: Boolean!

    "whether only the admins can see billable rates or everybody"
    only_admins_see_billable_rates: Boolean!
    "whether only the admins can see team dashboard or everybody"
    only_admins_see_team_dashboard: Boolean!
    "pro feature"
    projects_billable_by_default: Boolean!

    "type of rounding"
    rounding: Int!
    "round up to nearest minute"
    rounding_minutes: Int!
`

const typeDefs = gql`
  type Workspace {
    id: ID!

    ${workspaceFields}

    api_token: String!
    "timestamp that indicates the time workspace was last updated"
    at: DateTime!
    "calendar integration?"
    ical_enabled: Boolean!

    # RELATIONS

    "most active users (from dashboard)"
    user_activity: [WorkspaceUserActivity!]!
    "recent user activities (from dashboard)"
    activity: [WorkspaceActivity!]!
    "users in workspace"
    users: [WorkspaceUser!]!
    "to get a successful response, the token owner must be workspace admin"
    projects: [Project]
    "to get a successful response, the token owner must be workspace admin"
    groups: [Group]
  }

  # TODO: check fields
  input WorkspaceUpdateInput {
    ${workspaceFields}
  }


  extend type Query {
    workspace(workspace_id: ID!): Workspace
    workspaces: [Workspace!]!
  }

  extend type Mutation {
    updateWorkspace(workspace_id: ID!, data: WorkspaceUpdateInput!): Workspace!
  }
`

class WorkspaceAPI extends DataSource {
  async getWorkspace(workspace_id: ID): Promise<Maybe<Workspace>> {
    return this.get(`workspaces/${workspace_id}`).then(res => res.data)
  }

  async getWorkspaces(): Promise<Workspace[]> {
    return this.get(`workspaces`)
  }

  async getWorkspaceGroups(workspace_id: ID): Promise<Maybe<Group[]>> {
    return this.get(`workspaces/${workspace_id}/groups`)
  }

  async getWorkspaceProjects(workspace_id: ID): Promise<Maybe<Project[]>> {
    return this.get(`workspaces/${workspace_id}/projects`)
  }

  async updateWorkspace(workspace_id: ID, data: WorkspaceUpdateInput): Promise<Workspace> {
    return this.put(`workspaces/${workspace_id}`, { workspace: data }).then(res => res.data)
  }
}

const resolvers: Resolvers<ModuleContext<{ workspaceAPI: WorkspaceAPI }>> = {
  Query: {
    workspace: async (root, { workspace_id }, { dataSources }, info) =>
      dataSources.workspaceAPI.getWorkspace(workspace_id),

    workspaces: async (root, args, { dataSources }, info) =>
      dataSources.workspaceAPI.getWorkspaces(),
  },
  Mutation: {
    updateWorkspace: async (root, { workspace_id, data }, { dataSources }, info) =>
      dataSources.workspaceAPI.updateWorkspace(workspace_id, data),
  },
  Workspace: {
    groups: async (root, args, { dataSources }, info) =>
      dataSources.workspaceAPI.getWorkspaceGroups(root.id),

    projects: async (root, args, { dataSources }, info) =>
      dataSources.workspaceAPI.getWorkspaceProjects(root.id),
  },
}

export const workspaceModule = {
  typeDefs,
  resolvers,
  dataSources: {
    WorkspaceAPI,
  },
}
