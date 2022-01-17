Formula.js [![Build Status](https://travis-ci.com/formulajs/formulajs.svg?branch=master)](https://travis-ci.com/formulajs/formulajs)
==========

[Official website and documentation is here](https://formulajs.info)

## Use it

### In browser

Powered by [jsDelivr](https://www.jsdelivr.com/), you can use the latest version of Formula.js:

```html
<script src="https://cdn.jsdelivr.net/npm/jstat@1.9.2/dist/jstat.min.js"></script> 
<script src="https://cdn.jsdelivr.net/gh/formulajs/formulajs@2.9.3/dist/formula.min.js"></script>
```

Then the functions can be accessed as

```
formulajs.Date(2008, 7, 8)
formulajs.SUM([1, 2 , 3])
...
```

### In node

Install the package:

```json
npm i @formulajs/formulajs
```

## Differences between Excel functions and Formula.js

### Date

The functions ```DATE, DATEVALUE, EDATE, EOMONT, NOW, TODAY```return plain JS Date instead of the serial Excel number.

Copying composite formula directly from Excel into JS will not work out of the box:

```
= DATE(2020,5,9) - DATE(2020,5,8) // Formula.js: 86400000 / Excel: 1
```

It is not recommended to use ```DATEVALUE``` to parse string representing a date. Formula.js uses ```new Date('YOUR STRING')``` under the hood. There are better libraries to do this job (for example Moment.js)

## Migration guide

### From Formula.js

If you were previously using [formulajs from Sutoiku](https://www.npmjs.com/package/formulajs), some functions have been
removed, due to dependency simplification.

Text functions:

`FIXED, TEXT, DOLLAR, VALUE`

Math functions:

`MDETERM, MINVERSE, MMULT, MUNIT`

Otherwise the 2 packages are fully compatible. You can swap them.

### From @handsontable/formulajs

The code of this package is originally forked from @handsontable/formulajs version 2.0.2 (released in January 2020). The
two packages were identical at the time. There is no regression, only fixes and new functions since the fork.

## Historic

This project is forked from [handsontable/formula.js](https://github.com/handsontable/formula.js) and it's developed for
 everyone needs.
 
Original Formula.js project was developed and maintained by Ismael Chang Ghalimi, with support from STOIC and help from
 the following contributors: Ilmari Karonen, Sébastien Loisel, Trevor Norris, Roönaän, Hannes Stiebitzhofer.

It was then forked and extended by the [handsontable/formula.js](https://github.com/handsontable/formula.js) mainly 
contributed by [@budnix](https://github.com/budnix).

## Contributions and road map 2020

The road map in the coming month is to gather the improvements made in the main forks of the original project. If you 
forked and made changes to sutoiku/formula.js do not hesitate to propose a pull request with your changes. 

To avoid any regression or miss calculation please provide unit tests as long as function improvements.
