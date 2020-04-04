# toggl-graphql-server

> Server for graphql-lisation of toggl rest api.

[ENDPOINT/PLAYGROUND](https://toggl-graphql-server.vadistic.now.sh)

[DOCS](https://toggl-graphql-server.vadistic.now.sh/docs/)

## Why?

As a refresher and to check out [`graphql-modules`](https://graphql-modules.com/)

**Update**: At some point `graphql-modules` author decided to disable cross-module references and I do not see the point of them anymore. Refactored them out.

## Auth

Using Bearer token in Authorization header.

Alternatively `'Authorization': 'Basic xxx'`, where `xxx` is base64 encoded `token:api_key` or `email:password`

## Stack

- typescript/ graphql/ node
- [`graphql-code-generator`](https://github.com/dotansimha/graphql-code-generator)
- [`apollo-server`](https://github.com/apollographql/apollo-server)
- [`apollo-datasource-rest`](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-datasource-rest)
- [`micro`](https://github.com/zeit/micro)
- [`now`](https://github.com/zeit/now)
- [`graphdoc`](https://github.com/2fd/graphdoc)

- [`json-to-simple-graphql`](https://github.com/walmartlabs/json-to-simple-graphql-schema) (cool idea)

## Not implemented

- reports
- premium apis - I don't have premium to test it :)
