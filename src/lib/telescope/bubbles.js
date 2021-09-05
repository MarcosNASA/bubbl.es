export const nestScopesWithLines = (scopes, lines) => {
  const [globalScope] = scopes
  if (!globalScope) return []
  return nestScopesWithLinesRecursively(globalScope, lines)

  function nestScopesWithLinesRecursively(scope, lines, level = 0) {
    const { childScopes = [], type } = scope
    const additionalScopeInformation = scopes.find((s) => matchScopeBlocks(s, scope))

    const linesInRange = getScopeLines(lines, scope)

    const hasChildScopes = childScopes.length > 0
    if (!hasChildScopes)
      return [
        {
          ...scope,
          ...additionalScopeInformation,
          childrenScopesWithLines: [],
          nestedScopesOrLines: linesInRange,
          level,
          levels: level,
          lines: linesInRange,
        },
      ]
    const isForScope = type === 'for'
    const childrenScopesWithLines = childScopes.flatMap((childScope) =>
      nestScopesWithLinesRecursively(
        childScope,
        lines /* @TODO: Figure out how to use linesInRange (early optimization) */,
        level + !isForScope
      )
    )

    const nestedScopesOrLines = [
      ...new Set(
        linesInRange.map((line) => {
          const childScopeWhichOwnsLine = childrenScopesWithLines.find((childScope) => childScope.lines.includes(line))
          const isOwnLine = !childScopeWhichOwnsLine
          if (isOwnLine) {
            return line
          }
          return childScopeWhichOwnsLine
        })
      ),
    ]
    const childrenMaxLevel = Math.max(...childrenScopesWithLines.map(({ levels }) => levels))

    return [
      {
        ...scope,
        ...additionalScopeInformation,
        childrenScopesWithLines,
        nestedScopesOrLines,
        level,
        levels: childrenMaxLevel,
        lines: linesInRange,
      },
    ]
  }
}

const DEFAULT_SCOPES_LINE_FILTER = (_, index, array) =>
  array.lenght <= 2 || !(index === 0 || index === array.length - 1)
const SCOPE_LINES_FILTER = {
  global: () => true,
}
const getScopeLines = (lines, scope) => {
  const {
    block: {
      loc: {
        end: { line: lastScopeLine },
        start: { line: firstScopeLine },
      },
    },
    type,
  } = scope
  return lines
    .filter((line) => {
      const { id } = line
      const lineNumber = id + 1
      return lineNumber >= firstScopeLine && lineNumber <= lastScopeLine
    })
    .filter(SCOPE_LINES_FILTER[type] || DEFAULT_SCOPES_LINE_FILTER)
}

const matchScopeBlocks = (s1, s2) => {
  const { block: s1Block } = s1
  const { end: s1End, type: s1Type, start: s1Start } = s1Block
  const { block: s2Block } = s2
  const { end: s2End, type: s2Type, start: s2Start } = s2Block
  return s1Type === s2Type && s1Start === s2Start && s1End === s2End
}
