import { GraphQLModule } from '@graphql-modules/core'
import gql from 'graphql-tag'

export const SharedModule = new GraphQLModule({
  typeDefs: gql`
    scalar DateTime

    """
    identifies entity by unique ID
    """
    input UniqueIdInput {
      id: ID!
    }

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
})
