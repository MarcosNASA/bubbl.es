export const generateLines = (raw, tokens) => {
  const rawLines = getRawLines(raw)
  const lines = groupTokensByLine(tokens)
  const mergedLines = []

  let rawLineIndex = 0
  let lineIndex = 0
  let hasAnyMatch = false
  const numberOfRawLines = rawLines.length
  while (rawLineIndex < numberOfRawLines) {
    const rawTokens = rawLines[rawLineIndex] || []
    const { range: lineRange = [], tokens = [] } = lines[lineIndex] || {}
    const mergedLine = { id: rawLineIndex, tokens: [] }

    const isEmptyLine = !rawTokens.join('').trim()

    let rawTokenIndex = 0
    let tokenIndex = 0
    let isIndenting = true
    while (rawTokenIndex < rawTokens.length && !isEmptyLine) {
      const rawToken = rawTokens[rawTokenIndex]
      const isIndent = !rawToken.trim() && isIndenting
      if (!isIndent) {
        isIndenting = false
      }
      const token = tokens[tokenIndex]
      rawTokenIndex++

      const isMatch = rawToken.trim() === token?.value
      if (!isMatch) {
        mergedLine.tokens.push({
          id: `${rawLineIndex}-${rawTokenIndex}`,
          value: rawToken,
          isIndent,
        })
        continue
      }

      hasAnyMatch = true
      mergedLine.tokens.push({
        id: `${rawLineIndex}-${rawTokenIndex}`,
        value: rawToken,
        originalToken: token,
      })
      tokenIndex++
    }

    mergedLines.push({ ...mergedLine, range: lineRange })

    rawLineIndex++
    if (!isEmptyLine && hasAnyMatch) lineIndex++
    isIndenting = true
    hasAnyMatch = false
  }

  return mergedLines
}

const getRawLines = (rawCode) =>
  rawCode.split('\n').map((line) => line.split(/([a-zA-Z0-9'"`]+|{|\(|}|\)|\[|\]|`|,| )/g))

const groupTokensByLine = (tokens = []) =>
  Object.values(
    tokens.reduce((lines, token) => {
      const {
        loc: {
          start: { line: lineNumber },
        },
      } = token

      const line = lines[lineNumber] || { line: lineNumber, tokens: [] }
      const { tokens: lineTokens } = line

      return {
        ...lines,
        [lineNumber]: {
          id: lineNumber,
          tokens: [...lineTokens, token],
        },
      }
    }, {})
  ).map((line) => {
    const { tokens } = line
    const firstToken = tokens[0]
    const lastToken = tokens[tokens.length - 1]
    const { start } = firstToken
    const { end } = lastToken
    return {
      ...line,
      range: [start, end],
    }
  })
