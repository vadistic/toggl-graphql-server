import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Injectable, ProviderScope } from '@graphql-modules/di'
import { AuthenticationError } from 'apollo-server-micro'
import base64 from 'base-64'
import { GraphQLModule } from '@graphql-modules/core'

const ENDPOINT = `https://www.toggl.com/api/v8/`

export interface Session {
  req: any
  res: Response
}

export interface AuthContext {
  authToken: string
}

export const AuthModule = new GraphQLModule({
  context(session: Session): AuthContext {
    const authToken = session.req.headers.authorization

    if (!authToken)
      throw new AuthenticationError(
        `Not autenticated. Add Bearer token or base64 encoded Basic token in 'Authorization' header`,
      )

    const [prefix, token] = authToken.split(' ')

    // allow Basic tokens for log/password
    if (prefix === 'Basic' && token) return { authToken }
    // and standard Bearer api token
    if (prefix === 'Bearer' && token)
      return { authToken: 'Basic ' + base64.encode(token + ':api_token') }

    throw new AuthenticationError('Invalid authentication token.')
  },
})

@Injectable({ scope: ProviderScope.Session })
export class DataSource extends RESTDataSource<AuthContext> {
  constructor() {
    super()
    this.baseURL = ENDPOINT
  }

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.authToken)
  }

  async test() {
    return this.get('me')
  }
}
