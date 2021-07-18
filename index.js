var categories = [
  { require('./lib/compatibility')    ,"compatibility" }
, { require('./lib/database')         ,"database" }
, { require('./lib/engineering')      ,"engineering" }
, { require('./lib/logical')          ,"logical" }
, { require('./lib/math-trig')        ,"math-trig" }
, { require('./lib/text')             ,"text" }
, { require('./lib/date-time')        ,"date-time" }
, { require('./lib/financial')        ,"financial" }
, { require('./lib/information')      ,"information" }
, { require('./lib/lookup-reference') ,"lookup-reference" }
, { require('./lib/statistical')      ,"statistical" }
, { require('./lib/miscellaneous')     "miscellaneous" }
];

for (var c in categories) {
  var category = categories[c];
  for (var f in category.fun) {
    exports[f] = exports[f] || category.fun[f];
    // adding category to exported function
    exports[f].category = category.cat;
  }
}

var cats = {}
,   rgxp = /function\s*\(([^\)]*?)\)/
; 
Object.keys(exports).forEach( k => {
    rgxp.lastIndex = 0;
    var f = exports[k]
    ,   c = f.category
    ,   m = rgxp.exec(f.toString())
    ;
    cats[c] = cats[c] || {};
    cats[c][k] = m && m[1];
})
exports._functionsList = cats;

