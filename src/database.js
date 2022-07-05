import * as error from './utils/error.js'
import * as evalExpression from './utils/criteria-eval.js'
import * as maths from './math-trig.js'
import * as stats from './statistical.js'
import * as utils from './utils/common.js'

function compact(array) {
  const result = []

  utils.arrayEach(array, (value) => {
    if (value) {
      result.push(value)
    }
  })

  return result
}

export function FINDFIELD(database, title) {
  let index = null

  utils.arrayEach(database, (value, i) => {
    if (value[0] === title) {
      index = i

      return false
    }
  })

  // Return error if the input field title is incorrect
  if (index == null) {
    return error.value
  }

  return index
}

function findResultIndex(database, criterias) {
  const matches = {}

  for (let i = 1; i < database[0].length; ++i) {
    matches[i] = true
  }

  let maxCriteriaLength = criterias[0].length

  for (let i = 1; i < criterias.length; ++i) {
    if (criterias[i].length > maxCriteriaLength) {
      maxCriteriaLength = criterias[i].length
    }
  }

  for (let k = 1; k < database.length; ++k) {
    for (let l = 1; l < database[k].length; ++l) {
      let currentCriteriaResult = false
      let hasMatchingCriteria = false

      for (let j = 0; j < criterias.length; ++j) {
        const criteria = criterias[j]

        if (criteria.length < maxCriteriaLength) {
          continue
        }

        const criteriaField = criteria[0]

        if (database[k][0] !== criteriaField) {
          continue
        }

        hasMatchingCriteria = true

        for (let p = 1; p < criteria.length; ++p) {
          if (!currentCriteriaResult) {
            const isWildcard = criteria[p] === void 0 || criteria[p] === '*'

            if (isWildcard) {
              currentCriteriaResult = true
            } else {
              const tokenizedCriteria = evalExpression.parse(criteria[p] + '')
              const tokens = [evalExpression.createToken(database[k][l], evalExpression.TOKEN_TYPE_LITERAL)].concat(
                tokenizedCriteria
              )

              currentCriteriaResult = evalExpression.compute(tokens)
            }
          }
        }
      }

      if (hasMatchingCriteria) {
        matches[l] = matches[l] && currentCriteriaResult
      }
    }
  }

  const result = []

  for (let n = 0; n < database[0].length; ++n) {
    if (matches[n]) {
      result.push(n - 1)
    }
  }

  return result
}

// Database functions

export function DAVERAGE(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  let sum = 0

  utils.arrayEach(resultIndexes, (value) => {
    sum += targetFields[value]
  })

  return resultIndexes.length === 0 ? error.div0 : sum / resultIndexes.length
}

export function DCOUNT(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  const targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  return stats.COUNT(targetValues)
}

export function DCOUNTA(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  const targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  return stats.COUNTA(targetValues)
}

export function DGET(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  // Return error if no record meets the criteria
  if (resultIndexes.length === 0) {
    return error.value
  }
  // Returns the #NUM! error value because more than one record meets the
  // criteria
  if (resultIndexes.length > 1) {
    return error.num
  }

  return targetFields[resultIndexes[0]]
}

export function DMAX(database, field, criteria) {
  // Return error if field is not a number and not a string

  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  let maxValue = targetFields[resultIndexes[0]]

  utils.arrayEach(resultIndexes, (value) => {
    if (maxValue < targetFields[value]) {
      maxValue = targetFields[value]
    }
  })

  return maxValue
}

export function DMIN(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  let minValue = targetFields[resultIndexes[0]]

  utils.arrayEach(resultIndexes, (value) => {
    if (minValue > targetFields[value]) {
      minValue = targetFields[value]
    }
  })

  return minValue
}

export function DPRODUCT(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  let targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })
  targetValues = compact(targetValues)

  let result = 1

  utils.arrayEach(targetValues, (value) => {
    result *= value
  })

  return result
}

export function DSTDEV(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  let targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  targetValues = compact(targetValues)

  return stats.STDEV.S(targetValues)
}

export function DSTDEVP(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  let targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  targetValues = compact(targetValues)

  return stats.STDEV.P(targetValues)
}

export function DSUM(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  const targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  return maths.SUM(targetValues)
}

export function DVAR(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  const targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  return stats.VAR.S(targetValues)
}

export function DVARP(database, field, criteria) {
  // Return error if field is not a number and not a string

  if (isNaN(field) && typeof field !== 'string') {
    return error.value
  }

  const resultIndexes = findResultIndex(database, criteria)
  let targetFields = []

  if (typeof field === 'string') {
    const index = FINDFIELD(database, field)
    targetFields = utils.rest(database[index])
  } else {
    targetFields = utils.rest(database[field])
  }

  const targetValues = []

  utils.arrayEach(resultIndexes, (value) => {
    targetValues.push(targetFields[value])
  })

  return stats.VAR.P(targetValues)
}
