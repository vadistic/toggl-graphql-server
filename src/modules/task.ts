/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from '../data-source'
import { Resolvers, Task, TaskCreateInput, TaskUpdateInput } from '../generated'
import { gql } from '../noop-gql'
import { ID, ModuleContext } from '../types'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md

const typeDefs = gql`
  type Task {
    id: ID!
    "the name of the task"
    name: String!
    "project ID for a task"
    pid: ID!
    """
    workspace ID, where the task will be saved
    (project's workspace id is used when not supplied
    """
    wid: ID!
    "user ID, to whom the task is assigned to"
    uid: ID
    "estimated duration of task in seconds"
    estimated_seconds: Int
    "whether the task is done or not (by default true)"
    active: Boolean!
    "indicates the time task was last updated"
    at: DateTime!
    "total time tracked (in seconds) for the task"
    tracked_seconds: Int!
  }

  input TaskCreateInput {
    name: String!
    pid: ID!
    wid: ID
    active: Boolean
  }

  input TaskUpdateInput {
    name: String!
    active: Boolean
  }

  extend type Mutation {
    createTask(data: TaskCreateInput!): Task!
    updateTask(task_id: ID!, data: TaskUpdateInput!): Task!
    deleteTask(task_id: ID!): Boolean!
    updateManyTasks(task_ids: [ID!]!, data: TaskUpdateInput!): [Task!]!
    deleteManyTasks(task_ids: [ID!]!): Boolean!
  }
`

export class TaskAPI extends DataSource {
  async createTask(data: TaskCreateInput): Promise<Task> {
    return this.post(`tasks`, { task: data }).then(res => res.data)
  }

  async updateTask(task_id: ID, data: TaskUpdateInput): Promise<Task> {
    return this.put(`tasks/${task_id}`, { task: data }).then(res => res.data)
  }

  async deleteTask(task_id: ID): Promise<boolean> {
    return this.delete(`tasks/${task_id}`).then(res => !!res)
  }

  async updateManyTasks(task_ids: ID[], data: TaskUpdateInput): Promise<Task[]> {
    return this.put(`tasks/${task_ids.join(',')}`, { task: data }).then(res => res.data)
  }

  async deleteManyTasks(task_ids: ID[]): Promise<boolean> {
    return this.delete(`tasks/${task_ids.join(',')}`).then(res => !!res)
  }
}

const resolvers: Resolvers<ModuleContext<{ taskAPI: TaskAPI }>> = {
  Mutation: {
    createTask: async (root, { data }, { dataSources }, info) =>
      dataSources.taskAPI.createTask(data),

    updateTask: async (root, { task_id, data }, { dataSources }, info) =>
      dataSources.taskAPI.updateTask(task_id, data),

    deleteTask: async (root, { task_id }, { dataSources }, info) =>
      dataSources.taskAPI.deleteTask(task_id),

    updateManyTasks: async (root, { task_ids, data }, { dataSources }, info) =>
      dataSources.taskAPI.updateManyTasks(task_ids, data),

    deleteManyTasks: async (root, { task_ids }, { dataSources }, info) =>
      dataSources.taskAPI.deleteManyTasks(task_ids),
  },
}

export const taskModule = {
  typeDefs,
  resolvers,
  dataSources: {
    TaskAPI,
  },
}
