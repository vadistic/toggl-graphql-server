import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import {
  QueryResolvers,
  MutationResolvers,
  WorkspaceUpdateInput,
  Workspace,
  Maybe,
  WorkspaceResolvers,
  Project,
  Group,
} from '../generated'
import { DataSource } from '../data-source'
import { ID } from '../types'
import { gql as graphql } from '../gql'
import { SharedModule } from './shared'
import { WorkspaceActivityModule } from './workspace-activity'
import { WorkspaceUserModule } from './workspace-users'
import { WorkspaceGroupModule } from './workspace-group'
import { ProjectModule } from './project'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md

const workspaceFields = graphql`
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
    only_admins_see_team_dashboard: Boolean!
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


  type Query {
    workspace(workspace_id: ID!): Workspace
    workspaces: [Workspace!]!
  }

  type Mutation {
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

const Query: QueryResolvers<ModuleContext> = {
  workspace: async (root, { workspace_id }, { injector }, info) =>
    injector.get(WorkspaceAPI).getWorkspace(workspace_id),

  workspaces: async (root, args, { injector }, info) => injector.get(WorkspaceAPI).getWorkspaces(),
}

const Mutation: MutationResolvers<ModuleContext> = {
  updateWorkspace: async (root, { workspace_id, data }, { injector }, info) =>
    injector.get(WorkspaceAPI).updateWorkspace(workspace_id, data),
}

const Workspace: WorkspaceResolvers<ModuleContext> = {
  groups: async (root, args, { injector }, info) =>
    injector.get(WorkspaceAPI).getWorkspaceGroups(root.id),

  projects: async (root, args, { injector }, info) =>
    injector.get(WorkspaceAPI).getWorkspaceProjects(root.id),
}

export const WorkspaceModule = new GraphQLModule({
  typeDefs,
  imports: [
    SharedModule,
    WorkspaceActivityModule,
    WorkspaceUserModule,
    WorkspaceGroupModule,
    ProjectModule,
  ],
  providers: [WorkspaceAPI],
  resolvers: {
    Query,
    Mutation,
    Workspace,
  },
})
