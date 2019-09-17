/**
 * Noop gql-tag replacement - flattens interpolations and returns string
 */
export const gql = (literals: TemplateStringsArray, ...interpolations: string[]) => {
  let output = ''
  let index
  for (index = 0; index < interpolations.length; index++) {
    output += literals[index] + interpolations[index]
  }

  output += literals[index]
  return output.trim()
}
