const defaultOperator = '='
const validSymbols = ['>', '>=', '<', '<=', '=', '<>']
const _TOKEN_TYPE_OPERATOR = 'operator'
const _TOKEN_TYPE_LITERAL = 'literal'
const SUPPORTED_TOKENS = [_TOKEN_TYPE_OPERATOR, _TOKEN_TYPE_LITERAL]

export const TOKEN_TYPE_OPERATOR = _TOKEN_TYPE_OPERATOR
export const TOKEN_TYPE_LITERAL = _TOKEN_TYPE_LITERAL

/**
 * Create token which describe passed symbol/value.
 *
 * @param {String} value Value/Symbol to describe.
 * @param {String} type Type of the token 'operator' or 'literal'.
 * @return {Object}
 */
export function createToken(value, type) {
  if (SUPPORTED_TOKENS.indexOf(type) === -1) {
    throw new Error('Unsupported token type: ' + type)
  }

  return {
    value: value,
    type: type
  }
}

/**
 * Tries to cast numeric values to their type passed as a string.
 *
 * @param {*} value
 * @return {*}
 */
function castValueToCorrectType(value) {
  if (typeof value !== 'string') {
    return value
  }

  if (/^\d+(\.\d+)?$/.test(value)) {
    value = value.indexOf('.') === -1 ? parseInt(value, 10) : parseFloat(value)
  }

  return value
}

/**
 * Generate stream of tokens from passed expression.
 *
 * @param {String} expression
 * @return {String[]}
 */
function tokenizeExpression(expression) {
  const expressionLength = expression.length
  const tokens = []
  let cursorIndex = 0
  let processedValue = ''
  let processedSymbol = ''

  while (cursorIndex < expressionLength) {
    const char = expression.charAt(cursorIndex)

    switch (char) {
      case '>':
      case '<':
      case '=':
        processedSymbol = processedSymbol + char

        if (processedValue.length > 0) {
          tokens.push(processedValue)
          processedValue = ''
        }

        break
      default:
        if (processedSymbol.length > 0) {
          tokens.push(processedSymbol)
          processedSymbol = ''
        }

        processedValue = processedValue + char
        break
    }

    cursorIndex++
  }

  if (processedValue.length > 0) {
    tokens.push(processedValue)
  }

  if (processedSymbol.length > 0) {
    tokens.push(processedSymbol)
  }

  return tokens
}

/**
 * Analyze and convert tokens to an object which describes their meaning.
 *
 * @param {String[]} tokens
 * @return {Object[]}
 */
function analyzeTokens(tokens) {
  let literalValue = ''
  const analyzedTokens = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (i === 0 && validSymbols.indexOf(token) >= 0) {
      analyzedTokens.push(createToken(token, TOKEN_TYPE_OPERATOR))
    } else {
      literalValue += token
    }
  }

  if (literalValue.length > 0) {
    analyzedTokens.push(createToken(castValueToCorrectType(literalValue), TOKEN_TYPE_LITERAL))
  }

  if (analyzedTokens.length > 0 && analyzedTokens[0].type !== TOKEN_TYPE_OPERATOR) {
    analyzedTokens.unshift(createToken(defaultOperator, TOKEN_TYPE_OPERATOR))
  }

  return analyzedTokens
}

/**
 * Compute/Evaluate an expression passed as an array of tokens.
 *
 * @param {Object[]} tokens
 * @return {Boolean}
 */
function computeExpression(tokens) {
  const values = []
  let operator

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    switch (token.type) {
      case TOKEN_TYPE_OPERATOR:
        operator = token.value
        break
      case TOKEN_TYPE_LITERAL:
        values.push(token.value)
        break
    }
  }

  return evaluate(values, operator)
}

/**
 * Evaluate values based on passed math operator.
 *
 * @param {*} values
 * @param {String} operator
 * @return {Boolean}
 */
function evaluate(values, operator) {
  let result = false

  switch (operator) {
    case '>':
      result = values[0] > values[1]
      break
    case '>=':
      result = values[0] >= values[1]
      break
    case '<':
      result = values[0] < values[1]
      break
    case '<=':
      result = values[0] <= values[1]
      break
    case '=':
      result = values[0] == values[1]
      break
    case '<>':
      result = values[0] != values[1]
      break
  }

  return result
}

export function parse(expression) {
  return analyzeTokens(tokenizeExpression(expression))
}

export const compute = computeExpression
