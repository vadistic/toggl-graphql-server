import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { AuthenticationError } from 'apollo-server-express'

const ENDPOINT = `https://www.toggl.com/api/v8/`

export interface AuthContext {
  authToken: string
}

export class DataSource extends RESTDataSource<AuthContext> {
  constructor() {
    super()
    this.baseURL = ENDPOINT
  }

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.authToken)
  }

  // TODO: handle auth errors here
  didEncounterError(error: Error) {
    if (error.name === 'ForbiddenError') throw new AuthenticationError('Forbidden')
    else throw error
  }
}
