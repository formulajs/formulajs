var error = require('./utils/error');
var utils = require('./utils/common');

exports.MATCH = function(lookupValue, lookupArray, matchType) {
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
  if (!needle || !table || !index) {
    return error.na;
  }

  rangeLookup = !(rangeLookup === 0 || rangeLookup === false);
  var result = error.na;
  for (var i = 0; i < table.length; i++) {
    var row = table[i];

    if (row[0] === needle) {
      result = (index < (row.length + 1) ? row[index - 1] : error.ref);
      break;
    } else if ((rangeLookup && row[0] <= needle) ||
      (rangeLookup && typeof row[0] === "string" && row[0].localeCompare(needle) < 0)) {
      result = (index < (row.length + 1) ? row[index - 1] : error.ref);
    }
  }

  return result;
};

exports.HLOOKUP = function (needle, table, index, rangeLookup) {
  if (!needle || !table || !index) {
    return error.na;
  }

  rangeLookup = rangeLookup || false;

  var transposedTable = utils.transpose(table);

  for (var i = 0; i < transposedTable.length; i++) {
    var row = transposedTable[i];
    if ((!rangeLookup && row[0] === needle) ||
      ((row[0] === needle) ||
        (rangeLookup && typeof row[0] === "string" && row[0].toLowerCase().indexOf(needle.toLowerCase()) !== -1))) {
      return (index < (row.length + 1) ? row[index - 1] : error.ref);
    }
  }

  return error.na;
};

exports.LOOKUP = function (searchCriterion, array, resultArray) {
  array = utils.flatten(array);
  resultArray = utils.flatten(resultArray);

  var index = array.indexOf(searchCriterion);

  if (index > -1) {
    return resultArray[index];
  } else {
    return resultArray[resultArray.length - 1];
  }
};

exports.INDEX = function (cellRange, rowNumber, columnNumber) {
  columnNumber = columnNumber ? columnNumber : 1;
  rowNumber = rowNumber ? rowNumber : 1;

  if (rowNumber <= cellRange.length) {
    if (columnNumber <= cellRange[rowNumber - 1].length) {
      return cellRange[rowNumber - 1][columnNumber - 1];
    }
  }

  return error.ref;
};
