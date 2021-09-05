import prettier from 'prettier/standalone'
import espreeParser from 'prettier/parser-espree'
import { analyze } from 'eslint-scope'

import { generateTokens } from './tokens'
import { generateLines } from './lines'
import { generateScopes } from './scopes'
import { nestScopesWithLines } from './bubbles'

const {
  parsers: {
    espree: { parse },
  },
} = espreeParser

export function telescope(rawCode) {
  const formattedCode = formatCode(rawCode)
  const ast = generateAST(rawCode)
  const tokens = generateTokens(ast)
  const { scopes: rawScopes } = parseAST(ast)
  const { variableDeclarations, variableReferences, scopes } = generateScopes(rawScopes)
  const lines = generateLines(rawCode, tokens)
  const nestedScopes = nestScopesWithLines(scopes, lines)

  return {
    rawCode,
    formattedCode,
    scopes,
    nestedScopes,
    tokens,
    lines,
    variableDeclarations,
    variableReferences,
  }
}

const generateAST = (
  code,
  options = {
    ecmaVersion: 6,
    loc: true,
    range: true,
    tokens: true,
  }
) => parse(code, options)

const parseAST = (ast) =>
  analyze(ast, {
    ecmaVersion: '12',
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true },
  })

const formatCode = (code) => prettier.format(code, { parser: 'espree', plugins: [espreeParser] })
