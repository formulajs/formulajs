var error = require('./utils/error');
var stats = require('./statistical');
var maths = require('./math-trig');
var utils = require('./utils/common');
var evalExpression = require('./utils/criteria-eval');

function compact(array) {
  var result = [];

  utils.arrayEach(array, function(value) {
    if (value) {
      result.push(value);
    }
  });

  return result;
}

exports.FINDFIELD = function(database, title) {
  var index = null;

  utils.arrayEach(database, function(value, i) {
    if (value[0] === title) {
      index = i;
      return false;
    }
  });

  // Return error if the input field title is incorrect
  if (index == null) {
    return error.value;
  }

  return index;
};

function findResultIndex(database, criterias) {
  var matches = {};
  for (var i = 1; i < database[0].length; ++i) {
    matches[i] = true;
  }
  var maxCriteriaLength = criterias[0].length;
  for (i = 1; i < criterias.length; ++i) {
    if (criterias[i].length > maxCriteriaLength) {
      maxCriteriaLength = criterias[i].length;
    }
  }

  for (var k = 1; k < database.length; ++k) {
    for (var l = 1; l < database[k].length; ++l) {
      var currentCriteriaResult = false;
      var hasMatchingCriteria   = false;
      for (var j = 0; j < criterias.length; ++j) {
        var criteria = criterias[j];
        if (criteria.length < maxCriteriaLength) {
          continue;
        }

        var criteriaField = criteria[0];
        if (database[k][0] !== criteriaField) {
          continue;
        }
        hasMatchingCriteria = true;
        for (var p = 1; p < criteria.length; ++p) {
          if (!currentCriteriaResult) {
            var isWildcard = criteria[p] === void 0 || criteria[p] === '*';

            if (isWildcard) {
              currentCriteriaResult = true;
            } else {
              var tokenizedCriteria = evalExpression.parse(criteria[p] + '');
              var tokens = [evalExpression.createToken(database[k][l], evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria);

              currentCriteriaResult = evalExpression.compute(tokens);
            }
          }
        }
      }
      if (hasMatchingCriteria) {
        matches[l] = matches[l] && currentCriteriaResult;
      }
    }
  }

  var result = [];
  for (var n = 0; n < database[0].length; ++n) {
    if (matches[n]) {
      result.push(n - 1);
    }
  }

  return result;
}

// Database functions
exports.DAVERAGE = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }
  var sum = 0;

  utils.arrayEach(resultIndexes, function(value) {
    sum += targetFields[value];
  });

  return resultIndexes.length === 0 ? error.div0 : sum / resultIndexes.length;
};

exports.DCOUNT = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });

  return stats.COUNT(targetValues);
};

exports.DCOUNTA = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }

  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });

  return stats.COUNTA(targetValues);
};

exports.DGET = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }

  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  // Return error if no record meets the criteria
  if (resultIndexes.length === 0) {
    return error.value;
  }
  // Returns the #NUM! error value because more than one record meets the
  // criteria
  if (resultIndexes.length > 1) {
    return error.num;
  }

  return targetFields[resultIndexes[0]];
};

exports.DMAX = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var maxValue = targetFields[resultIndexes[0]];

  utils.arrayEach(resultIndexes, function(value) {
    if (maxValue < targetFields[value]) {
      maxValue = targetFields[value];
    }
  });

  return maxValue;
};

exports.DMIN = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }

  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var minValue = targetFields[resultIndexes[0]];

  utils.arrayEach(resultIndexes, function(value) {
    if (minValue > targetFields[value]) {
      minValue = targetFields[value];
    }
  });

  return minValue;
};

exports.DPRODUCT = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }

  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });
  targetValues = compact(targetValues);

  var result = 1;

  utils.arrayEach(targetValues, function(value) {
    result *= value;
  });

  return result;
};

exports.DSTDEV = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }
  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });
  targetValues = compact(targetValues);

  return stats.STDEV.S(targetValues);
};

exports.DSTDEVP = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });
  targetValues = compact(targetValues);

  return stats.STDEV.P(targetValues);
};

exports.DSUM = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }

  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });

  return maths.SUM(targetValues);
};

exports.DVAR = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }
  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });

  return stats.VAR.S(targetValues);
};

exports.DVARP = function(database, field, criteria) {
  // Return error if field is not a number and not a string
  if (isNaN(field) && (typeof field !== "string")) {
    return error.value;
  }
  var resultIndexes = findResultIndex(database, criteria);
  var targetFields = [];

  if (typeof field === "string") {
    var index = exports.FINDFIELD(database, field);
    targetFields = utils.rest(database[index]);
  } else {
    targetFields = utils.rest(database[field]);
  }
  var targetValues = [];

  utils.arrayEach(resultIndexes, function(value) {
    targetValues.push(targetFields[value]);
  });

  return stats.VAR.P(targetValues);
};
