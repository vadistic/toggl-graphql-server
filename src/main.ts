import { instance, server } from '.'

const bootstrap = async () => {
  instance.listen({ port: 3000 }, () => {
    console.log(`🚀 Server started: http://localhost:${3000}${server.graphqlPath}`)
  })
}

bootstrap()
