import * as React from 'react'

import { useScopesState } from '../../context/scopes'
import { getScopeBubbleAnimationProps } from '../../helpers/animations'

import { CodeContainer, CodeDisplay, Code, LineOfCode } from '../../components/ui/Bubbler'
import { ScopeBubble } from '../../components/ui/Bubbles'

import { Token } from './Token'

const Bubbler = () => {
  const { rawCode = '', nestedScopes = [] } = useScopesState()

  const hasCode = !!rawCode

  const [globalScope] = nestedScopes
  const { levels } = globalScope || {}
  const hasGlobalScope = !!globalScope

  return (
    <CodeContainer>
      <CodeDisplay>
        {hasCode && <Code>{hasGlobalScope && <Scope scope={globalScope} levels={levels} />}</Code>}
        {!hasCode && (
          <Code>
            <EmptyScope />
          </Code>
        )}
      </CodeDisplay>
    </CodeContainer>
  )
}

export default Bubbler

const EmptyScope = () => <LineOfCode />

const Scope = ({ scope, levels }) => {
  const { nestedScopesOrLines, id, index, level } = scope
  const { bubbleColors } = useScopesState()
  const bubbleColor = bubbleColors[id]

  return (
    <ScopeBubble background={bubbleColor} level={level} levels={levels} {...getScopeBubbleAnimationProps({ level })}>
      {nestedScopesOrLines.map((lineOrScope) => {
        const isNestedScope = Boolean(lineOrScope.type)
        const { id: nestedScopeId, index: nestedScopeIndex } = lineOrScope
        if (isNestedScope)
          return <Scope key={`sB-${nestedScopeIndex}-${nestedScopeId}`} scope={lineOrScope} levels={levels} />

        const { id: lineId, tokens } = lineOrScope
        return (
          <LineOfCode key={`${id}-${index}-${lineId}`}>
            {tokens.map((token) => {
              const { isIndent } = token
              if (isIndent) {
                return <React.Fragment key={token.id}>&nbsp;</React.Fragment>
              }
              return <Token key={token.id} scopeLevel={level} token={token} />
            })}
            {!tokens.length > 0 && <>&nbsp;</>}
          </LineOfCode>
        )
      })}
    </ScopeBubble>
  )
}
