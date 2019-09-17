import { GraphQLModule } from '@graphql-modules/core'
import { AuthenticationError, ApolloError } from 'apollo-server-micro'
import base64 from 'base-64'
import fetch from 'node-fetch'

export interface Session {
  // req:
  req: any
  res: Response
}

export const AuthModule = new GraphQLModule({
  async context(session: Session, currentContext, { injector }) {
    const auth = session.req.headers.authorization

    if (!auth)
      throw new AuthenticationError(
        'Not autenticated. Add Bearer of base64 encoded Basic token in Authorization header',
      )

    const prefix = auth.split(' ')[0]
    const token = auth.split(' ')[1]

    // allow Basic tokens for log/password
    if (prefix === 'Basic' && token) return { auth }
    // and standard Bearer api token
    if (prefix === 'Bearer' && token)
      return { auth: 'Basic ' + base64.encode(token + ':api_token') }

    throw new AuthenticationError('Invalid authentication token.')
  },
})
