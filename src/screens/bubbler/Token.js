import * as React from 'react'

import { TOKEN_TYPE_IDENTIFIER } from '../../constants'
import { useScopesState } from '../../context/scopes'
import { getBubbleAnimationProps } from '../../helpers/animations'
import { arePrimitivePropertiesEqual, getNumberOfReferences } from '../../helpers'

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

  const { value, originalToken = {} } = token
  const { type } = originalToken
  const isIdentifier = type === TOKEN_TYPE_IDENTIFIER

  const variable = React.useMemo(
    () =>
      isIdentifier ? findVariableByToken(originalToken, [...variableDeclarations, ...variableReferences]) : void 0,
    [isIdentifier, originalToken, variableDeclarations, variableReferences]
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
        isHovering ? applyHoveringStyles(variable) : removeHoveringStyles(variable)
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

const applyHoveringStyles = (variable) => {
  const { isVariableDeclaration = false } = variable.dataset
  variable.style.setProperty('filter', `drop-shadow(2px 2px 2px rgba(0, 0, 0, ${isVariableDeclaration ? 1 : 0.75}))`)
  variable.setAttribute('role', 'mark')
}

const removeHoveringStyles = (variable) => {
  variable.style.removeProperty('filter')
  variable.removeAttribute('role')
}
