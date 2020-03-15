import { gql } from '../noop-gql'

const typeDefs = gql`
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
`

export const sharedModule = {
  typeDefs,
}
