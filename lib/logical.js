var error = require('./utils/error');
var utils = require('./utils/common');
var information = require('./information');

exports.AND = function() {
  if (arguments.length < 1) {
    return error.na;
  }
  var args = utils.flatten(arguments);
  var result = error.value;
  for (var i = 0; i < args.length; i++) {
    if (args[i] instanceof Error) {
      return args[i];
    }
    if (args[i] === undefined || args[i] === null || typeof args[i] === "string") {
      continue;
    }
    if (result === error.value) {
      result = true;
    }
    if (!args[i]) {
      result = false;
    }
  }
  return result;
};

exports.CHOOSE = function() {
  if (arguments.length < 2) {
    return error.na;
  }

  var index = arguments[0];
  if (index < 1 || index > 254) {
    return error.value;
  }

  if (arguments.length < index + 1) {
    return error.value;
  }

  return arguments[index];
};

exports.FALSE = function() {
  if (arguments.length !== 0) {
    return error.na;
  }
  return false;
};

exports.IF = function(test, then_value, otherwise_value) {
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na;
  }
  if (test instanceof Error) {
    return test;
  }
  then_value = arguments.length >= 2 ? then_value : true;
  if (then_value === undefined || then_value === null) {
    then_value = 0;
  }
  otherwise_value = arguments.length === 3 ? otherwise_value : false;
  if (otherwise_value === undefined || otherwise_value === null) {
    otherwise_value = 0;
  }
  return test ? then_value : otherwise_value;
};

exports.IFS = function() {
  if (arguments.length < 2 || arguments.length % 2 !== 0) {
    return error.na;
  }
  for (var i = 0; i < arguments.length / 2; i++) {
    if (arguments[i * 2]) {
      return arguments[i * 2 + 1];
    }
  }
  return error.na;
};

exports.IFERROR = function(value, valueIfError) {
  if (arguments.length !== 2) {
    return error.na;
  }
  if (information.ISERROR(value)) {
    return valueIfError;
  }
  return value;
};

exports.IFNA = function(value, value_if_na) {
  if (arguments.length !== 2) {
    return error.na;
  }
  return value === error.na ? value_if_na : value;
};

exports.NOT = function(logical) {
  if (arguments.length !== 1) {
    return error.na;
  }
  if (typeof logical === "string") {
    return error.value;
  }
  if (logical instanceof Error) {
    return logical;
  }
  return !logical;
};

exports.OR = function() {
  if (arguments.length < 1) {
    return error.na;
  }
  var args = utils.flatten(arguments);
  var result = error.value;
  for (var i = 0; i < args.length; i++) {
    if (args[i] instanceof Error) {
      return args[i];
    }
    if (args[i] === undefined || args[i] === null || typeof args[i] === "string") {
      continue;
    }
    if (result === error.value) {
      result = false;
    }
    if (args[i]) {
      result = true;
    }
  }
  return result;
};

exports.TRUE = function() {
  if (arguments.length !== 0) {
    return error.na;
  }
  return true;
};

exports.XOR = function() {
  if (arguments.length < 1) {
    return error.na;
  }
  var args = utils.flatten(arguments);
  var result = error.value;
  for (var i = 0; i < args.length; i++) {
    if (args[i] instanceof Error) {
      return args[i];
    }
    if (args[i] === undefined || args[i] === null || typeof args[i] === "string") {
      continue;
    }
    if (result === error.value) {
      result = 0;
    }
    if (args[i]) {
      result++;
    }
  }
  if (result === error.value) {
    return result;
  }
  return (Math.floor(Math.abs(result)) & 1) ? true : false;
};

exports.SWITCH = function () {
  if (arguments.length < 3){
    return error.na;
  }
  var result;

  if (arguments.length > 0)  {
    var targetValue = arguments[0];
    var argc = arguments.length - 1;
    var switchCount = Math.floor(argc / 2);
    var switchSatisfied = false;
    var hasDefaultClause = argc % 2 !== 0;
    var defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1];

    if (switchCount) {
      for (var index = 0; index < switchCount; index++) {
        if (targetValue === arguments[index * 2 + 1]) {
          result = arguments[index * 2 + 2];
          switchSatisfied = true;
          break;
        }
      }
    }

    if (!switchSatisfied) {
      result = hasDefaultClause ? defaultClause : error.na;
    }
  } else {
    result = error.value;
  }

  return result;
};
