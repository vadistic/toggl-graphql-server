/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import { Resolvers, WorkspaceActivity, WorkspaceUserActivity } from '../generated'
import { gql } from '../noop-gql'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/dashboard.md

const typeDefs = gql`
  type WorkspaceUserActivity {
    "user ID"
    user_id: ID!
    "sum (in seconds) of time entry durations that have been created during last 7 days"
    duration: Int!
  }

  type WorkspaceActivity {
    "user ID"
    user_id: ID!
    "project ID (ID is 0 if time entry doesn't have project connected to it)"
    project_id: ID!
    """
    Time entry duration in seconds.
    If the time entry is currently running, the duration attribute contains a negative value, denoting the start of the time entry in seconds since epoch (Jan 1 1970).
    The correct duration can be calculated as current_time + duration, where current_time is the current time in seconds since epoch.
    """
    duration: Int!
    "Description property is not present if time entry description is empty"
    description: String
    "time entry stop time (ISO 8601 date and time. Stop property is not present when time entry is still running)"
    stop: DateTime
    "task id, if applicable"
    tid: ID
  }
`

export class WorkspaceActivityAPI extends DataSource {
  async getWorkspaceUserActivity(workspace_id: ID): Promise<WorkspaceUserActivity[]> {
    return this.get(`dashboard/${workspace_id}`).then(res => res['most_active_user'])
  }

  // fetch repetition is super-cool with session caching
  async getWorkspaceActivity(workspace_id: ID): Promise<WorkspaceActivity[]> {
    return this.get(`dashboard/${workspace_id}`).then(res => res['activity'])
  }
}

const resolvers: Resolvers<ModuleContext<{ workspaceActivityAPI: WorkspaceActivityAPI }>> = {
  Workspace: {
    activity: async (root, args, { dataSources }, info) =>
      dataSources.workspaceActivityAPI.getWorkspaceActivity(root.id),

    user_activity: async (root, args, { dataSources }, info) =>
      dataSources.workspaceActivityAPI.getWorkspaceUserActivity(root.id),
  },
}

export const workspaceActivityModule = {
  typeDefs,
  resolvers,
  dataSources: { WorkspaceActivityAPI },
}
