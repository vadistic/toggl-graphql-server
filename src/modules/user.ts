import { DataSource } from '../data-source'
import { DetailedUser, Resolvers, User, UserCreateInput, UserUpdateInput } from '../generated'
import { ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md

const userFields = /* GraphQL */ `
    "default workspace id"
    default_wid: ID!
    "user's email"
    email: String!
    "user's full name"
    fullname: String!
    "eg. 'h:i A'"
    jquery_timeofday_format: String!
    "eg. 'h:i A'"
    jquery_date_format: String!
    "eg. 'h:mm A'"
    timeofday_format: String!
    "eg. MM/DD/YYYY"
    date_format: String!
    "whether start and stop time are saved on time entry"
    store_start_and_stop_time: Boolean!
    "integer 0-6 (Sunday=0)"
    beginning_of_week: Int!
    "should a piechart be shown on the sidebar"
    sidebar_piechart: Boolean!
    "???"
    timeline_experiment: Boolean!
`

const typeDefs = /* GraphQL */ `
  """
  basic user data
  """
  type User {
    id: ID!

    ${userFields}
  }

  """
  detailed user data
  """
  type DetailedUser {
    id: ID!

    ${userFields}

    workspaces: [Workspace]!
    "user's language"
    language: String!
    "url with the user's profile picture"
    image_url: String
    "timestamp of last changes"
    at: DateTime!
    "account create date"
    created_at: DateTime!

    "an object with toggl blog post title and link"
    new_blog_post: BlogPost
    "toggl can send newsletters over e-mail to the user"
    send_product_emails: Boolean!
    "if user receives weekly report"
    send_weekly_report: Boolean!
    "email user about long-running (more than 8 hours) tasks"
    send_timer_notifications: Boolean!

    "???"
    openid_email: String
    "openid_enabled: (boolean) google signin enabled"
    openid_enabled: Boolean!
    "timezone user has set on the 'My profile' page (IANA TZ timezones)"

    timezone: String!
    "???"
    retention: Int
    "???"
    record_timeline: Boolean
    "???"
    render_timeline: Boolean
    "???"
    timeline_enabled: Boolean
    "???"
    should_upgrade: Boolean
    "???"
    achievements_enabled: Boolean
    "??? TODO: Check type!"
    last_blog_entry: String
    "???"
    duration_format: String
  }

  input UserCreateInput {
    "a valid email"
    email: String!
    "password at least 6 characters long"
    password: String!
    "for example 'Etc/UTC'"
    timezone: String!
    "in free form, name of the app that signed the user app"
    created_with: String!
  }

  input UserUpdateInput {
    fullname: String
    "a valid email"
    email: String

    send_product_emails: Boolean
    send_weekly_report: Boolean
    send_timer_notifications: Boolean
    store_start_and_stop_time: Boolean

    "integer 0-6 (Sunday=0)"
    beginning_of_week: Int
    "IANA TZ timezones"
    timezone: String
    "'YYYY-MM-DD', 'DD.MM.YYYY', 'DD-MM-YYYY', 'MM/DD/YYYY', 'DD/MM/YYYY', 'MM-DD-YYYY'"
    timeofday_format: String
    "'H:mm' for 24-hour format, 'h:mm A' for 12-hour format (AM/PM)"
    date_format: String
  }

  extend type Query {
    "get current user data"
    user: DetailedUser!
  }

  extend type Mutation {
    createUser(data: UserCreateInput!): User!
    updateUser(data: UserUpdateInput!): User!
    resetToken: String!
  }
`

export class UserAPI extends DataSource {
  async getUser(): Promise<DetailedUser> {
    return this.get(`me`).then(res => res.data)
  }

  async createUser(data: UserCreateInput): Promise<User> {
    return this.post(`signups`, { user: data }).then(res => res.data)
  }

  async updateUser(data: UserUpdateInput): Promise<User> {
    return this.put(`me`, { user: data }).then(res => res.data)
  }

  async resetToken(): Promise<string> {
    return this.post(`reset_token`)
  }
}

const resolvers: Resolvers<ModuleContext<{ userAPI: UserAPI }>> = {
  Query: {
    user: async (root, args, { dataSources }, info) => dataSources.userAPI.getUser(),
  },
  Mutation: {
    createUser: async (root, { data }, { dataSources }, info) =>
      dataSources.userAPI.createUser(data),

    updateUser: async (root, { data }, { dataSources }, info) =>
      dataSources.userAPI.updateUser(data),

    resetToken: async (root, args, { dataSources }, info) => dataSources.userAPI.resetToken(),
  },
}

export const userModule = {
  typeDefs,
  resolvers,
  dataSources: { UserAPI },
}
