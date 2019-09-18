import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import { URLSearchParams } from 'apollo-server-env'

import {
  MutationResolvers,
  TimeEntryCreateInput,
  TimeEntryUpdateInput,
  TimeEntryStartInput,
  TimeEntry,
  Maybe,
  TimeEntryUpdateManyInput,
  QueryResolvers,
} from '../generated'
import { DataSource } from '../data-source'
import { SharedModule } from './shared'
import { gql as graphql } from '../gql'
import { ID } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md

const timeEntryInfoFields = graphql`
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

const timeEntryDurationFields = graphql`
    """
    time entry duration in seconds

    If the time entry is currently running, the duration attribute contains a negative value,
    denoting the start of the time entry in seconds since epoch (Jan 1 1970).

    The correct duration can be calculated as current_time + duration,
    where current_time is the current time in seconds since epoch.
    """
    duration: Int!
`

const timeEntryStartStopFields = graphql`
    "time entry start time (ISO 8601 date and time)"
    start: DateTime!
    "time entry stop time (ISO 8601 date and time)"
    stop: DateTime
`

const typeDefs = gql`
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

  type Query {
    timeEntry(time_entry_id: ID!): TimeEntry
    currentTimeEntry: TimeEntry
    timeEntries(start_date: DateTime, end_date: DateTime): [TimeEntry]
  }

  type Mutation {
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

const Query: QueryResolvers<ModuleContext> = {
  timeEntry: async (root, { time_entry_id }, { injector }, info) =>
    injector.get(TimeEntryAPI).getTimeEntry(time_entry_id),

  currentTimeEntry: async (root, args, { injector }, info) =>
    injector.get(TimeEntryAPI).getCurrentTimeEntry(),

  timeEntries: async (root, { start_date, end_date }, { injector }, info) =>
    injector.get(TimeEntryAPI).getTimeEntries(start_date, end_date),
}

const Mutation: MutationResolvers<ModuleContext> = {
  createTimeEntry: async (root, { data }, { injector }, info) =>
    injector.get(TimeEntryAPI).createTimeEntry(data),

  updateTimeEntry: async (root, { time_entry_id, data }, { injector }, info) =>
    injector.get(TimeEntryAPI).updateTimeEntry(time_entry_id, data),

  deleteTimeEntry: async (root, { time_entry_id }, { injector }, info) =>
    injector.get(TimeEntryAPI).deleteTimeEntry(time_entry_id),

  startTimeEntry: async (root, { data }, { injector }, info) =>
    injector.get(TimeEntryAPI).startTimeEntry(data),

  stopTimeEntry: async (root, { time_entry_id }, { injector }, info) =>
    injector.get(TimeEntryAPI).stopTimeEntry(time_entry_id),

  updateManyTimeEntries: async (root, { time_entry_ids, data }, { injector }, info) =>
    injector.get(TimeEntryAPI).updateManyTimeEntries(time_entry_ids, data),
}

export const TimeEntriesModule = new GraphQLModule({
  typeDefs,
  providers: [TimeEntryAPI],
  imports: [SharedModule],
  resolvers: {
    Query,
    Mutation,
  },
})
