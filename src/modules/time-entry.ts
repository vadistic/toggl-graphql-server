/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import {
  Maybe,
  Resolvers,
  TimeEntry,
  TimeEntryCreateInput,
  TimeEntryStartInput,
  TimeEntryUpdateInput,
  TimeEntryUpdateManyInput,
} from '../generated'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md

const timeEntryInfoFields = /* GraphQL */ `
    "strongly suggested to be used"
    description: String
    "workspace ID (required if pid or tid not supplied)"
    wid: ID
    "project ID"
    pid: ID
    "task ID"
    tid: ID
    "default false, available for pro workspaces"
    billable: Boolean
    "the name of your client app"
    created_with: String
    "a list of tag names"
    tags: [String]
    "should Toggl show the start and stop time of this time entry?"
    duronly: Boolean
`

const timeEntryDurationFields = /* GraphQL */ `
    """
    time entry duration in seconds

    If the time entry is currently running, the duration attribute contains a negative value,
    denoting the start of the time entry in seconds since epoch (Jan 1 1970).

    The correct duration can be calculated as current_time + duration,
    where current_time is the current time in seconds since epoch.
    """
    duration: Int!
`

const timeEntryStartStopFields = /* GraphQL */ `
    "time entry start time (ISO 8601 date and time)"
    start: DateTime!
    "time entry stop time (ISO 8601 date and time)"
    stop: DateTime
`

const typeDefs = /* GraphQL */ `
  type TimeEntry {
    id: ID!

    ${timeEntryInfoFields}
    ${timeEntryDurationFields}
    ${timeEntryStartStopFields}

    "indicates the time item was last updated"
    at: DateTime!
  }

  input TimeEntryCreateInput {
    ${timeEntryInfoFields}
    ${timeEntryDurationFields}
    ${timeEntryStartStopFields}
  }

  input TimeEntryStartInput {
    ${timeEntryInfoFields}
  }

  input TimeEntryUpdateInput {
    ${timeEntryInfoFields}
    ${timeEntryDurationFields}
    ${timeEntryStartStopFields}
  }

  input TimeEntryUpdateManyInput {
    "a list of tag names, providing only this atteribute overrides tags on the time entries"
    tags: [String!]!
    "(add, remove) merges to or removes from the current time entry tags the values"
    tag_action: String!
  }

  extend type Query {
    timeEntry(time_entry_id: ID!): TimeEntry
    currentTimeEntry: TimeEntry
    timeEntries(start_date: DateTime, end_date: DateTime): [TimeEntry]
  }

  extend type Mutation {
    createTimeEntry(data:TimeEntryCreateInput!): TimeEntry!
    updateTimeEntry(time_entry_id: ID!, data:TimeEntryUpdateInput!): TimeEntry!
    deleteTimeEntry(time_entry_id: ID!): Boolean!

    startTimeEntry(data:TimeEntryStartInput!): TimeEntry!
    stopTimeEntry(time_entry_id: ID!): TimeEntry!
    currentTimeEntry: TimeEntry

    updateManyTimeEntries(time_entry_ids: [ID!]!, data: TimeEntryUpdateManyInput!): [TimeEntry]
  }
`

export class TimeEntryAPI extends DataSource {
  async getTimeEntry(time_entry_id: ID): Promise<Maybe<TimeEntry>> {
    return this.get(`time_entries/${time_entry_id}`).then(res => res.data)
  }

  async getCurrentTimeEntry(): Promise<Maybe<TimeEntry>> {
    return this.get(`time_entries/current`).then(res => res.data)
  }

  // TODO: test if this format of date work
  async getTimeEntries(
    start_date?: Maybe<string>,
    end_date?: Maybe<string>,
  ): Promise<Maybe<TimeEntry[]>> {
    return this.get(
      `time_entries`,
      new URLSearchParams({ start_date: start_date || '', end_date: end_date || '' }),
    )
  }

  async createTimeEntry(data: TimeEntryCreateInput): Promise<TimeEntry> {
    return this.post(`time_entries`, data).then(res => res.data)
  }

  async updateTimeEntry(time_entry_id: ID, data: TimeEntryUpdateInput): Promise<TimeEntry> {
    return this.put(`time_entries/${time_entry_id}`, data).then(res => res.data)
  }

  async deleteTimeEntry(time_entry_id: ID): Promise<boolean> {
    return this.delete(`time_entries/${time_entry_id}`).then(res => !!res)
  }

  async startTimeEntry(data: TimeEntryStartInput): Promise<TimeEntry> {
    return this.post(`time_entries/start`, data).then(res => res.data)
  }

  async stopTimeEntry(time_entry_id: ID): Promise<TimeEntry> {
    return this.put(`time_entries/${time_entry_id}/stop`).then(res => res.data)
  }

  async updateManyTimeEntries(
    time_entry_ids: ID[],
    data: TimeEntryUpdateManyInput,
  ): Promise<Maybe<TimeEntry[]>> {
    return this.put(`time_entries/${time_entry_ids.join(',')}`, data).then(res => res.data)
  }
}

const resolvers: Resolvers<ModuleContext<{ timeEntryAPI: TimeEntryAPI }>> = {
  Query: {
    timeEntry: async (root, { time_entry_id }, { dataSources }, info) =>
      dataSources.timeEntryAPI.getTimeEntry(time_entry_id),

    currentTimeEntry: async (root, args, { dataSources }, info) =>
      dataSources.timeEntryAPI.getCurrentTimeEntry(),

    timeEntries: async (root, { start_date, end_date }, { dataSources }, info) =>
      dataSources.timeEntryAPI.getTimeEntries(start_date, end_date),
  },
  Mutation: {
    createTimeEntry: async (root, { data }, { dataSources }, info) =>
      dataSources.timeEntryAPI.createTimeEntry(data),

    updateTimeEntry: async (root, { time_entry_id, data }, { dataSources }, info) =>
      dataSources.timeEntryAPI.updateTimeEntry(time_entry_id, data),

    deleteTimeEntry: async (root, { time_entry_id }, { dataSources }, info) =>
      dataSources.timeEntryAPI.deleteTimeEntry(time_entry_id),

    startTimeEntry: async (root, { data }, { dataSources }, info) =>
      dataSources.timeEntryAPI.startTimeEntry(data),

    stopTimeEntry: async (root, { time_entry_id }, { dataSources }, info) =>
      dataSources.timeEntryAPI.stopTimeEntry(time_entry_id),

    updateManyTimeEntries: async (root, { time_entry_ids, data }, { dataSources }, info) =>
      dataSources.timeEntryAPI.updateManyTimeEntries(time_entry_ids, data),
  },
}

export const timeEntryModule = { typeDefs, resolvers, dataSources: { TimeEntryAPI } }
