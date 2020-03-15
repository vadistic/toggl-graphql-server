import { NowRequest, NowResponse } from '@now/node'
import { AuthenticationError } from 'apollo-server-express'
import base64 from 'base-64'
import { AuthContext } from './data-source'

interface Session {
  req: NowRequest
  res: NowResponse
}

export const context = (session: Session): AuthContext => {
  const authToken = session.req.headers?.authorization

  // no error to allow introspction without header
  if (!authToken) return { authToken: '' }

  const [prefix, token] = authToken.split(' ')

  // allow Basic tokens for log/password
  if (prefix === 'Basic' && token) return { authToken }
  // and standard Bearer api token
  if (prefix === 'Bearer' && token)
    return { authToken: 'Basic ' + base64.encode(token + ':api_token') }

  throw new AuthenticationError('Invalid authentication token format')
}

export type Context = AuthContext
