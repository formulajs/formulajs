var categories = [
  { fun: require('./lib/compatibility')    ,cat: "compatibility" }
, { fun: require('./lib/database')         ,cat: "database" }
, { fun: require('./lib/engineering')      ,cat: "engineering" }
, { fun: require('./lib/logical')          ,cat: "logical" }
, { fun: require('./lib/math-trig')        ,cat: "math-trig" }
, { fun: require('./lib/text')             ,cat: "text" }
, { fun: require('./lib/date-time')        ,cat: "date-time" }
, { fun: require('./lib/financial')        ,cat: "financial" }
, { fun: require('./lib/information')      ,cat: "information" }
, { fun: require('./lib/lookup-reference') ,cat: "lookup-reference" }
, { fun: require('./lib/statistical')      ,cat: "statistical" }
, { fun: require('./lib/miscellaneous')    ,cat: "miscellaneous" }
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

