import { GraphQLModule } from '@graphql-modules/core'
import gql from 'graphql-tag'

export const SharedModule = new GraphQLModule({
  typeDefs: gql`
    scalar DateTime

    input WhereUniqueId {
      id: ID!
    }
  `,
})
