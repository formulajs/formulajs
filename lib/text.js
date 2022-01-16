var utils = require('./utils/common');
var error = require('./utils/error');

//TODO
exports.ASC = function() {
  throw new Error('ASC is not implemented');
};

//TODO
exports.BAHTTEXT = function() {
  throw new Error('BAHTTEXT is not implemented');
};

exports.CHAR = function(number) {
  number = utils.parseNumber(number);
  if (number === 0) {
    return error.value;
  }
  if (number instanceof Error) {
    return number;
  }
  return String.fromCharCode(number);
};

exports.CLEAN = function(text) {
  if (utils.anyIsError(text)) {
    return text;
  }
  text = text || '';
  var re = /[\0-\x1F]/g;
  return text.replace(re, "");
};

exports.CODE = function(text) {
  if (utils.anyIsError(text)) {
    return text;
  }
  text = text || '';
  var result = text.charCodeAt(0);

  if (isNaN(result)) {
    result = error.value;
  }
  return result;
};

exports.CONCATENATE = function() {
  var args = utils.flatten(arguments);
  var someError = utils.anyError.apply(undefined, args);
  if (someError) {
    return someError;
  }
  var trueFound = 0;
  while ((trueFound = args.indexOf(true)) > -1) {
    args[trueFound] = 'TRUE';
  }

  var falseFound = 0;
  while ((falseFound = args.indexOf(false)) > -1) {
    args[falseFound] = 'FALSE';
  }

  return args.join('');
};

exports.CONCAT = exports.CONCATENATE;

//TODO
exports.DBCS = function() {
  throw new Error('DBCS is not implemented');
};

//TODO
exports.DOLLAR = function() {
  throw new Error('DOLLAR is not implemented');
};

exports.EXACT = function(text1, text2) {
  if (arguments.length !== 2) {
    return error.na;
  }
  var someError = utils.anyError(text1, text2);
  if (someError) {
    return someError;
  }
  text1 = utils.parseString(text1);
  text2 = utils.parseString(text2);
  return text1 === text2;
};

exports.FIND = function(find_text, within_text, position) {
  if (arguments.length < 2) {
    return error.na;
  }
  find_text = utils.parseString(find_text);
  within_text = utils.parseString(within_text);
  position = (position === undefined) ? 0 : position;
  var found_index = within_text.indexOf(find_text, position - 1);
  if (found_index === -1) {
    return error.value;
  }
  return found_index + 1;
};

//TODO
exports.FIXED = function() {
  throw new Error('FIXED is not implemented');
};

exports.HTML2TEXT = function (value) {
  if (utils.anyIsError(value)) {
    return value;
  }
  var result = '';

  if (value) {
    if (value instanceof Array) {
      value.forEach(function (line) {
        if (result !== '') {
          result += '\n';
        }
        result += (line.replace(/<(?:.|\n)*?>/gm, ''));
      });
    } else {
      result = value.replace(/<(?:.|\n)*?>/gm, '');
    }
  }

  return result;
};

exports.LEFT = function(text, number) {
  var someError = utils.anyError(text, number);
  if (someError) {
    return someError;
  }
  text = utils.parseString(text);
  number = (number === undefined) ? 1 : number;
  number = utils.parseNumber(number);
  if (number instanceof Error || typeof text !== 'string') {
    return error.value;
  }
  return text.substring(0, number);
};

exports.LEN = function(text) {
  if (arguments.length === 0) {
    return error.error;
  }

  if (text instanceof Error) {
    return text;
  }

  if (Array.isArray(text)) {
    return error.value;
  }

  var textAsString = utils.parseString(text);
  return textAsString.length;
};

exports.LOWER = function(text) {
  if (arguments.length !== 1) {
    return error.value;
  }
  text = utils.parseString(text);
  if (utils.anyIsError(text)) {
    return text;
  }
  return text.toLowerCase();
};

exports.MID = function(text, start, number) {
  if (start === undefined || start === null) {
    return error.value;
  }
  start = utils.parseNumber(start);
  number = utils.parseNumber(number);
  if (utils.anyIsError(start, number) || typeof text !== 'string') {
    return number;
  }

  var begin = start - 1;
  var end = begin + number;

  return text.substring(begin, end);
};

// TODO
exports.NUMBERVALUE = function (text, decimal_separator, group_separator)  {
  decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;
  group_separator = (typeof group_separator === 'undefined') ? ',' : group_separator;
  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''));
};

// TODO
exports.PRONETIC = function() {
  throw new Error('PRONETIC is not implemented');
};

exports.PROPER = function(text) {
  if (utils.anyIsError(text)) {
    return text;
  }
  if (isNaN(text) && typeof text === 'number') {
    return error.value;
  }
  text = utils.parseString(text);

  return text.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.REGEXEXTRACT = function (text, regular_expression) {
  if (arguments.length < 2) {
    return error.na;
  }
  var match = text.match(new RegExp(regular_expression));
  return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
};

exports.REGEXMATCH = function (text, regular_expression, full) {
  if (arguments.length < 2) {
    return error.na;
  }
  var match = text.match(new RegExp(regular_expression));
  return full ? match : !!match;
};

exports.REGEXREPLACE = function (text, regular_expression, replacement) {
  if (arguments.length < 3) {
    return error.na;
  }
  return text.replace(new RegExp(regular_expression), replacement);
};

exports.REPLACE = function(text, position, length, new_text) {
  position = utils.parseNumber(position);
  length = utils.parseNumber(length);
  if (utils.anyIsError(position, length) ||
    typeof text !== 'string' ||
    typeof new_text !== 'string') {
    return error.value;
  }
  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
};

exports.REPT = function(text, number) {
  var someError = utils.anyError(text, number);
  if (someError) {
    return someError;
  }
  text = utils.parseString(text);
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return new Array(number + 1).join(text);
};

exports.RIGHT = function(text, number) {
  var someError = utils.anyError(text, number);
  if (someError) {
    return someError;
  }
  text = utils.parseString(text);
  number = (number === undefined) ? 1 : number;
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return text.substring(text.length - number);
};

exports.SEARCH = function(find_text, within_text, position) {
  var foundAt;
  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
    return error.value;
  }
  position = (position === undefined) ? 0 : position;
  foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1)+1;
  return (foundAt === 0)?error.value:foundAt;
};

exports.SPLIT = function (text, separator) {
  return text.split(separator);
};

exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
  if (arguments.length < 3) {
    return error.na;
  }
  if (!text || !old_text) {
    return text;
  } else if (occurrence === undefined) {
    return text.split(old_text).join(new_text);
  } else {
    occurrence = Math.floor(Number(occurrence));
    if (Number.isNaN(occurrence) || occurrence <= 0) {
      return error.value;
    }
    var index = 0;
    var i = 0;
    while (index > -1 && text.indexOf(old_text, index) > -1) {
      index = text.indexOf(old_text, index + 1);
      i++;
      if (index > -1 && i === occurrence) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
      }
    }
    return text;
  }
};

exports.T = function(value) {
  if (value instanceof Error) {
    return value;
  }
  return (typeof value === "string") ? value : '';
};

// TODO incomplete implementation
exports.TEXT = function() {
  throw new Error('TEXT is not implemented');
};

exports.TRIM = function(text) {
  text = utils.parseString(text);
  if (text instanceof Error) {
    return text;
  }
  return text.replace(/\s+/g, ' ').trim();
};

exports.UNICHAR = exports.CHAR;

exports.UNICODE = exports.CODE;

exports.UPPER = function(text) {
  text = utils.parseString(text);
  if (text instanceof Error) {
    return text;
  }
  return text.toUpperCase();
};

exports.VALUE = function(num) {
  var anyError = utils.anyError(num);
  if (anyError) {
    return anyError;
  }

  if (typeof num !== 'string') {
    return error.value;
  }

  var isPercent = /(%)$/.test(num) || /^(%)/.test(num);
  num = num.replace(/^[^0-9-]{0,3}/, '');
  num = num.replace(/[^0-9]{0,3}$/, '');
  num = num.replace(/[\ ,]/g,'');

  if(num ===''){
    return error.value;
  }

  var output =  Number(num);

  if(isNaN(output)){
    return error.value;
  }

  output = output || 0;

  if(isPercent) {
    output = output * 0.01;
  }

  return output;
};
