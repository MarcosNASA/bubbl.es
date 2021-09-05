import { filterMatchingIdentifiers } from './helpers'

export const generateVariables = (scopes) => {
  const variableDeclarations = scopes.flatMap(({ variableDeclarations }) => [...variableDeclarations])

  const variableReferences = scopes
    .reduce(variableReferencesExtractionReducer, [])
    .filter(filterMatchingIdentifiers(variableDeclarations))

  return { variableDeclarations, variableReferences }

  function variableReferencesExtractionReducer(references, scope) {
    const { variableReferences } = scope

    const mappedVariableReferences = variableReferences
      .filter(filterMatchingIdentifiers(references))
      .map((variableReference) => {
        const { originalVariableDeclaration: referenceOriginalVariableDeclaration } = variableReference
        const variableDeclaration =
          variableDeclarations.find(
            ({ original: originalVariableDeclaration }) =>
              originalVariableDeclaration === referenceOriginalVariableDeclaration
          ) || {}

        const { variableDeclarationId, variableDeclarationScopeId = 0 } = variableDeclaration
        return { ...variableReference, variableDeclarationId, variableDeclarationScopeId, variableDeclaration }
      })

    return [...references, ...mappedVariableReferences]
  }
}
