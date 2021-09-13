var error = require('./utils/error');
var utils = require('./utils/common');

exports.MATCH = function (lookupValue, lookupArray, matchType) {
  if (!lookupValue && !lookupArray) {
    return error.na;
  }

  if (arguments.length === 2) {
    matchType = 1;
  }
  if (!(lookupArray instanceof Array)) {
    return error.na;
  }

  lookupArray = utils.flatten(lookupArray);

  if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
    return error.na;
  }
  var index;
  var indexValue;
  for (var idx = 0; idx < lookupArray.length; idx++) {
    if (matchType === 1) {
      if (lookupArray[idx] === lookupValue) {
        return idx + 1;
      } else if (lookupArray[idx] < lookupValue) {
        if (!indexValue) {
          index = idx + 1;
          indexValue = lookupArray[idx];
        } else if (lookupArray[idx] > indexValue) {
          index = idx + 1;
          indexValue = lookupArray[idx];
        }
      }
    } else if (matchType === 0) {
      if (typeof lookupValue === 'string') {
        lookupValue = lookupValue.replace(/\?/g, '.');
        if (lookupArray[idx].toLowerCase().match(lookupValue.toLowerCase())) {
          return idx + 1;
        }
      } else {
        if (lookupArray[idx] === lookupValue) {
          return idx + 1;
        }
      }
    } else if (matchType === -1) {
      if (lookupArray[idx] === lookupValue) {
        return idx + 1;
      } else if (lookupArray[idx] > lookupValue) {
        if (!indexValue) {
          index = idx + 1;
          indexValue = lookupArray[idx];
        } else if (lookupArray[idx] < indexValue) {
          index = idx + 1;
          indexValue = lookupArray[idx];
        }
      }
    }
  }

  return index ? index : error.na;
};

exports.VLOOKUP = function (needle, table, index, rangeLookup) {
  if (!table || !index) {
    return error.na;
  }

  rangeLookup = !(rangeLookup === 0 || rangeLookup === false);
  var result = error.na;
  var isNumberLookup = (typeof needle === "number");
  var exactMatchOnly = false;
  for (var i = 0; i < table.length; i++) {
    var row = table[i];

    if (row[0] === needle) {
      result = (index < (row.length + 1) ? row[index - 1] : error.ref);
      break;
    } else if (!exactMatchOnly && ((isNumberLookup && rangeLookup && row[0] <= needle) ||
      (rangeLookup && typeof row[0] === "string" && row[0].localeCompare(needle) < 0))) {
      result = (index < (row.length + 1) ? row[index - 1] : error.ref);
    }

    if (isNumberLookup && row[0] > needle) {
      exactMatchOnly = true;
    }
  }

  return result;
};

exports.HLOOKUP = function (needle, table, index, rangeLookup) {
  return exports.VLOOKUP(needle, utils.transpose(table), index, rangeLookup);
};

exports.LOOKUP = function (searchCriterion, array, resultArray) {
  array = utils.flatten(array);
  resultArray = utils.flatten(resultArray);
  var isNumberLookup = (typeof searchCriterion === "number");
  var result = error.na;

  for (var i = 0; i < array.length; i++) {
    if (array[i] === searchCriterion) {
      return resultArray[i];
    } else if ((isNumberLookup && array[i] <= searchCriterion) ||
      (typeof array[i] === "string" && array[i].localeCompare(searchCriterion) < 0)) {
      result = resultArray[i];
    } else if ((isNumberLookup && array[i] > searchCriterion)) {
      return result;
    }
  }

  return result;
};

exports.INDEX = function (cellRange, rowNumber, columnNumber) {
  var someError = utils.anyError(cellRange, rowNumber, columnNumber);
  if (someError) {
    return someError;
  }

  if (!Array.isArray(cellRange)) {
    return error.value;
  }

  var isOneDimensionRange = cellRange.length > 0 && !Array.isArray(cellRange[0]);

  if (isOneDimensionRange && !columnNumber) {
    columnNumber = rowNumber;
    rowNumber = 1;
  } else {
    columnNumber = columnNumber ? columnNumber : 1;
    rowNumber = rowNumber ? rowNumber : 1;
  }

  if (columnNumber < 0 || rowNumber < 0) {
    return error.value;
  }

  if (isOneDimensionRange && rowNumber === 1 && columnNumber <= cellRange.length) {
    return cellRange[columnNumber - 1];
  } else if (rowNumber <= cellRange.length && columnNumber <= cellRange[rowNumber - 1].length) {
    return cellRange[rowNumber - 1][columnNumber - 1];
  }

  return error.ref;
};
