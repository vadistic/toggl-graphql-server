import { clientModule } from './modules/client'
import { projectModule } from './modules/project'
import { projectUserModule } from './modules/project-user'
import { sharedModule } from './modules/shared'
import { tagModule } from './modules/tag'
import { taskModule } from './modules/task'
import { timeEntryModule } from './modules/time-entry'
import { userModule } from './modules/user'
import { workspaceModule } from './modules/workspace'
import { workspaceActivityModule } from './modules/workspace-activity'
import { workspaceGroupModule } from './modules/workspace-group'
import { workspaceUserModule } from './modules/workspace-users'

export const dataSources = () => ({
  clientAPI: new clientModule.dataSources.ClientAPI(),
  projectUserAPI: new projectUserModule.dataSources.ProjectUserAPI(),
  projectAPI: new projectModule.dataSources.ProjectAPI(),
  tagAPI: new tagModule.dataSources.TagAPI(),
  taskAPI: new taskModule.dataSources.TaskAPI(),
  timeEntryAPI: new timeEntryModule.dataSources.TimeEntryAPI(),
  userAPI: new userModule.dataSources.UserAPI(),
  workspaceActivityAPI: new workspaceActivityModule.dataSources.WorkspaceActivityAPI(),
  workspaceGroupAPI: new workspaceGroupModule.dataSources.WorkspaceGroupAPI(),
  workspaceUserAPI: new workspaceUserModule.dataSources.WorkspaceUserAPI(),
  workspaceAPI: new workspaceModule.dataSources.WorkspaceAPI(),
})

const root = /* GraphQL */ `
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`

export const typeDefs = [
  root,
  clientModule.typeDefs,
  projectUserModule.typeDefs,
  projectModule.typeDefs,
  sharedModule.typeDefs,
  tagModule.typeDefs,
  taskModule.typeDefs,
  timeEntryModule.typeDefs,
  userModule.typeDefs,
  workspaceActivityModule.typeDefs,
  workspaceGroupModule.typeDefs,
  workspaceUserModule.typeDefs,
  workspaceModule.typeDefs,
].join('\n')

// for codegen
export default typeDefs

export const resolvers = [
  clientModule.resolvers,
  projectUserModule.resolvers,
  projectModule.resolvers,
  tagModule.resolvers,
  taskModule.resolvers,
  timeEntryModule.resolvers,
  userModule.resolvers,
  workspaceActivityModule.resolvers,
  workspaceGroupModule.resolvers,
  workspaceUserModule.resolvers,
  workspaceModule.resolvers,
]
