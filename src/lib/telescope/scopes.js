import { generateVariables } from './variables'

export const generateScopes = (rawScopes) => {
  const scopes = parseScopes(rawScopes)
  const { variableDeclarations, variableReferences } = generateVariables(scopes)

  return {
    scopes,
    variableDeclarations,
    variableReferences,
  }
}

const parseScopes = (scopes) => {
  let variableCounter = -1
  return scopes.map(
    ({ block: { body, ...block }, type, references, through, variables, ...scopeProperties }, index) => {
      const scopeId = !['for', 'with'].includes(type) ? index : index + 1 // @TODO: Why?
      return {
        ...scopeProperties,
        index,
        id: scopeId,
        block,
        type,
        references,
        through,
        variables,
        variableReferences: [...new Set([...references, ...through])].map((reference) => {
          const { identifier, resolved } = reference
          const isResolved = !!resolved
          const originalVariableDeclaration = isResolved ? resolved : {}
          return {
            identifier,
            isResolved,
            original: reference,
            originalVariableDeclaration,
            scopeId: isResolved ? scopeId : 1,
          }
        }),
        variableDeclarations: variables
          .filter(({ identifiers: [identifier] }) => identifier)
          .map((variable) => {
            const {
              defs: [def],
              identifiers: [identifier],
              scope: {
                block: { type: declarationScopeBlockType },
              },
            } = variable

            variableCounter++
            return {
              id: variableCounter,
              variableDeclarationId: variableCounter,
              identifier,
              variableDeclarationScopeId: scopeId,
              isVariableDeclaration: true,
              isFormalParameterOrIteratorAble:
                def.type === 'Parameter' ||
                ['ForStatement', 'ForOfStatement', 'ForInStatement', 'WithStatement'].includes(
                  declarationScopeBlockType
                ),
              isResolved: true,
              original: variable,
              scopeId: scopeId,
            }
          }),
      }
    }
  )
}
