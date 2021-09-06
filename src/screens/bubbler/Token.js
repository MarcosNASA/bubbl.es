import * as React from 'react'

import { colors as themeColors } from '../../components/ui/theme'

import { TOKEN_TYPE_IDENTIFIER } from '../../constants'
import { useScopesState } from '../../context/scopes'
import { getBubbleAnimationProps } from '../../helpers/animations'

import { Bubble } from '../../components/ui/Bubbles'

const matchTokenToVariableIdentifier = (token, variableIdentifier = {}) => {
  const { end: tokenEnd, start: tokenStart } = token
  const { end: variableIdentifierEnd, start: variableIdentifierStart } = variableIdentifier
  return tokenEnd === variableIdentifierEnd && tokenStart === variableIdentifierStart
}
const findVariableByToken = (token, variables) =>
  variables.find((variable) => matchTokenToVariableIdentifier(token, variable.identifier))

export const Token = ({ scopeLevel, token }) => {
  const { variableDeclarations, variableReferences } = useScopesState()

  const { value, token: tokenReference = {} } = token
  const { type } = tokenReference
  const isIdentifier = type === TOKEN_TYPE_IDENTIFIER

  const variable = React.useMemo(
    () =>
      isIdentifier ? findVariableByToken(tokenReference, [...variableDeclarations, ...variableReferences]) : void 0,
    [isIdentifier, tokenReference, variableDeclarations, variableReferences]
  )
  const isVariable = !!variable

  if (!isVariable) return value
  return <BubbleToken scopeLevel={scopeLevel} token={token} variable={variable} />
}

const BubbleToken = React.memo(
  ({ scopeLevel, token, variable }) => {
    const [isHovering, setIsHovering] = React.useState(false)
    const [sameVariables, setSameVariables] = React.useState([])
    const { bubbleColors } = useScopesState()
    const {
      variableDeclarationId,
      isResolved,
      isVariableDeclaration,
      isFormalParameterOrIteratorAble,
      variableDeclarationScopeId: scopeId,
    } = variable
    const { value } = token
    const numberOfReferences = getNumberOfReferences(variable)

    React.useEffect(() => {
      if (!isResolved) return
      const sameVariableNodes = document.querySelectorAll(`[data-variable-declaration-id="${variableDeclarationId}"]`)
      if (!sameVariableNodes.length > 0) return
      setSameVariables([...sameVariableNodes])
    }, [variableDeclarationId, isResolved, numberOfReferences])

    React.useEffect(() => {
      if (isResolved) return
      const sameVariableNodes = document.querySelectorAll(`[data-value="${value}"]`)
      if (!sameVariableNodes.length > 0) return
      setSameVariables([...sameVariableNodes])
    }, [value, isResolved, numberOfReferences])

    React.useEffect(() => {
      sameVariables.forEach((variable) => {
        const { isVariableDeclaration = false } = variable.dataset
        isHovering
          ? variable.style.setProperty(
              'outline',
              `${1 + Boolean(isVariableDeclaration)}px solid ${themeColors.light[100]}`
            )
          : variable.style.removeProperty('outline')
      })
    }, [isHovering, sameVariables])

    const scopeIdWithoutModule = scopeId === 1 ? 0 : scopeId
    const bubbleColor = bubbleColors[scopeIdWithoutModule || 0]

    return (
      <Bubble
        data-variable-declaration-id={variableDeclarationId}
        data-is-variable-declaration={isVariableDeclaration}
        data-value={value}
        onMouseEnter={() => {
          setIsHovering(true)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
        }}
        background={bubbleColor}
        $isFormalParameterOrIteratorAble={isFormalParameterOrIteratorAble}
        {...getBubbleAnimationProps({ scopeLevel })}
      >
        {value}
      </Bubble>
    )
  },
  ({ variable: previousVariable }, { variable }) => {
    const isSameVariable = arePrimitivePropertiesEqual(previousVariable.identifier, variable.identifier)
    const didVariableReferencesUpdate = previousVariable.references?.length === variable.references?.length
    return isSameVariable && !didVariableReferencesUpdate
  }
)

const getNumberOfReferences = (variable) => {
  const originalVariable = variable.isVariableDeclaration ? variable.original : variable.originalVariableDeclaration
  return originalVariable.references?.length || 0
}

const arePrimitivePropertiesEqual = (a, b) => {
  for (const [key, value] of Object.entries(a)) {
    if (!isPrimitive(value)) continue
    if (Object.is(value, b[key])) continue
    return false
  }

  return true
}

const isPrimitive = (x) => {
  var type = typeof x
  return x == null || (type !== 'object' && type !== 'function')
}
