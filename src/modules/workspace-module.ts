import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import {
  QueryResolvers,
  MutationResolvers,
  UniqueIdInput,
  WorkspaceUpdateInput,
  Workspace,
  Maybe,
} from '../generated/graphql'
import { DataSource, AuthModule } from '../data-source'
import { SharedModule } from './shared-module'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md

const typeDefs = gql`
  type Workspace {
    id: ID!
    # the name of the workspace
    name: String!
    # (if set, otherwise omited)
    logo_url: String
    # ???
    profile: Int
    # if it's a pro workspace or not. Shows if someone is paying for the workspace or not
    premium: Boolean!
    # shows whether currently requesting user has admin access to the workspace (boolean)
    admin: Boolean!
    # default_hourly_rate: default hourly rate for workspace, won't be shown to non-admins if the only_admins_see_billable_rates flag is set to true
    default_hourly_rate: Float
    # default currency for workspace
    default_currency: String
    # whether only the admins can create projects or everybody
    only_admins_may_create_projects: Boolean!

    # whether only the admins can see billable rates or everybody (boolean)
    only_admins_see_billable_rates: Boolean!
    only_admins_see_team_dashboard: Boolean!
    projects_billable_by_default: Boolean!

    # type of rounding
    rounding: Int!
    # round up to nearest minute
    rounding_minutes: Int!

    api_token: String!

    # timestamp that indicates the time workspace was last updated
    at: DateTime!

    ical_enabled: Boolean!
  }

  # TODO: check fields
  input WorkspaceUpdateInput {
    # the name of the workspace
    name: String!
    # (if set, otherwise omited)
    logo_url: String
    # ???
    profile: Int
    # if it's a pro workspace or not. Shows if someone is paying for the workspace or not
    premium: Boolean!
    # shows whether currently requesting user has admin access to the workspace (boolean)
    admin: Boolean!
    # default_hourly_rate: default hourly rate for workspace, won't be shown to non-admins if the only_admins_see_billable_rates flag is set to true
    default_hourly_rate: Float
    # default currency for workspace
    default_currency: String
    # whether only the admins can create projects or everybody
    only_admins_may_create_projects: Boolean!

    # whether only the admins can see billable rates or everybody (boolean)
    only_admins_see_billable_rates: Boolean!
    only_admins_see_team_dashboard: Boolean!
    projects_billable_by_default: Boolean!

    # type of rounding
    rounding: Int!
    # round up to nearest minute
    rounding_minutes: Int!
  }

  type Query {
    workspace(where: UniqueIdInput!): Workspace
    workspaces: [Workspace!]!
  }

  type Mutation {
    updateWorkspace(where: UniqueIdInput!, data: WorkspaceUpdateInput!): Workspace!
  }
`

export class WorkspacesAPI extends DataSource {
  async getWorkspace({ id }: UniqueIdInput): Promise<Maybe<Workspace>> {
    return this.get(`workspaces/${id}`)
  }

  async getWorkspaces(): Promise<Workspace[]> {
    return this.get(`workspaces`)
  }

  async updateWorkspace({ id }: UniqueIdInput, data: WorkspaceUpdateInput): Promise<Workspace> {
    return this.put(`workspaces/${id}`, { workspace: data }).then(res => res.data)
  }
}

const Query: QueryResolvers<ModuleContext> = {
  workspace: async (root, { where }, { injector }, info) =>
    injector.get(WorkspacesAPI).getWorkspace(where),
  workspaces: async (root, args, { injector }, info) => injector.get(WorkspacesAPI).getWorkspaces(),
}

const Mutation: MutationResolvers<ModuleContext> = {
  updateWorkspace: async (root, { where, data }, { injector }, info) =>
    injector.get(WorkspacesAPI).updateWorkspace(where, data),
}

export const WorkspacesModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule, AuthModule],
  providers: [WorkspacesAPI],
  resolvers: {
    Query,
    Mutation,
  },
})
