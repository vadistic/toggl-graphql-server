import { ApolloServer, gql } from 'apollo-server-micro'

const mockData = [
  {
    director: 'Bryan Singer',
    title: 'Bohemian Rhapsody',
  },
  {
    director: 'Bob Persichetti',
    title: 'Spider-Man: Into the Spider-Verse',
  },
]

const typeDefs = gql`
  type Movie {
    title: String
    director: String
  }
  type Query {
    movies: [Movie]
  }
`

const resolvers = {
  Query: { movies: () => mockData },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

const graphqlPath = '/'
const graphqlHandler = server.createHandler({ path: graphqlPath })

module.exports = graphqlHandler
