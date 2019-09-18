import { GraphQLModule } from '@graphql-modules/core'
import gql from 'graphql-tag'
import { AuthenticationError } from 'apollo-server-micro'
import base64 from 'base-64'

export interface Session {
  req: any
  res: Response
}

export interface AuthContext {
  authToken: string
}

export const SharedModule = new GraphQLModule({
  typeDefs: gql`
    scalar DateTime

    type BlogPost {
      title: String!
      url: String!
      category: String!
      pub_date: DateTime!
    }

    """
    ???
    """
    type Obm {
      included: Boolean!
      nr: Int!
      actions: String!
    }
  `,

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
