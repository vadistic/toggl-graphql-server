# toggl-graphql-server

GraphQL API for toggl.com

[ENDPOINT/PLAYGROUND](https://toggl-graphql-server.vadistic.now.sh)

[DOCS](https://toggl-graphql-server.vadistic.now.sh/docs/)

## Why?

As a refresher and to check out `graphql-modules`

## Auth

Using Bearer token in Authorization header.

Alternatively 'Authorization': 'Basic xxx', where xxx is base64 encoded token:api_key or email:apssword

## Stack

- typescript/ graphql/ node
- [`graphql-modules`](https://github.com/Urigo/graphql-modules)
- [`graphql-code-generator`](https://github.com/dotansimha/graphql-code-generator)
- [`apollo-server`](https://github.com/apollographql/apollo-server)
- [`apollo-datasource-rest`](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-datasource-rest)
- [`micro`](https://github.com/zeit/micro)
- [`now`](https://github.com/zeit/now)
- [`graphdoc`](https://github.com/2fd/graphdoc)

- [`json-to-simple-graphql`](https://github.com/walmartlabs/json-to-simple-graphql-schema) (cool idea)

## TODO

- Implement reports
