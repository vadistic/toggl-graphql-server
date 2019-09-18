import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Injectable, ProviderScope } from '@graphql-modules/di'
import { AuthContext } from './modules'

const ENDPOINT = `https://www.toggl.com/api/v8/`

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
