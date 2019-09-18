import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import gql from 'graphql-tag'
import { DataSource } from '../data-source'
import { MutationResolvers, ProjectResolvers, ProjectUser } from '../generated'
import { ID } from '../types'
import { SharedModule } from '.'

// https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md

const typeDefs = gql`
  type ProjectUser {
    id: ID!
    "project ID"
    pid: ID!
    "user ID, who is added to the project"
    uid: ID!
    "workspace ID, where the project belongs to"
    wid: ID!
    "admin rights for this project"
    manager: Boolean!
    """
    hourly rate for the project user,
    only for pro workspaces,
    in the currency of the project's client or in workspace default currency.
    """
    rate: Float
    "when the project user was last updated"
    at: DateTime!
  }
`

class ProjectUserAPI extends DataSource {
  async getProjectUsers(project_id: ID): Promise<ProjectUser[]> {
    const res = await this.get(`projects/${project_id}/project_users`)

    console.log(res)

    return this.get(`projects/${project_id}/project_users`)
  }
}

const Mutation: MutationResolvers<ModuleContext> = {}

const Project: ProjectResolvers<ModuleContext> = {
  users: async (root, args, { injector }, info) =>
    injector.get(ProjectUserAPI).getProjectUsers(root.id),
}

export const ProjectUserModule = new GraphQLModule({
  typeDefs,
  imports: [SharedModule],
  providers: [ProjectUserAPI],
  resolvers: {
    Mutation,
    Project,
  },
})
