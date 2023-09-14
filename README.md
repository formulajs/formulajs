# Formula.js

[![Tests](https://github.com/formulajs/formulajs/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/formulajs/formulajs/actions/workflows/unit-tests.yaml) [![Build/Publish](https://github.com/formulajs/formulajs/actions/workflows/npm-publish.yaml/badge.svg)](https://github.com/formulajs/formulajs/actions/workflows/npm-publish.yaml)

[Official website and documentation is here](https://formulajs.info)

## Use it

### In browser

[![](https://data.jsdelivr.com/v1/package/npm/@formulajs/formulajs/badge)](https://www.jsdelivr.com/package/npm/@formulajs/formulajs)

Powered by [jsDelivr](https://www.jsdelivr.com/), you can use the latest version of Formula.js:

```html
<script src="https://cdn.jsdelivr.net/npm/@formulajs/formulajs/lib/browser/formula.min.js"></script>
```

Then the functions can be accessed as

```javascript
formulajs.DATE(2008, 7, 8)
formulajs.SUM([1, 2, 3])
...
```

### In node

[![npm](https://img.shields.io/npm/v/@formulajs/formulajs?style=flat-square)](https://www.npmjs.com/package/@formulajs/formulajs) [![npm](https://img.shields.io/npm/dm/@formulajs/formulajs?style=flat-square)](https://www.npmjs.com/package/@formulajs/formulajs)

Install the package:

```
npm i @formulajs/formulajs
```

#### import

```javascript
import * as formulajs from '@formulajs/formulajs' // import entire package

formulajs.SUM([1, 2, 3]) // 6
```

```javascript
import { SUM } from '@formulajs/formulajs' // import individual components

SUM([1, 2, 3]) // 6
```

#### require

```javascript
const formulajs = require('@formulajs/formulajs') // require entire package

formulajs.SUM([1, 2, 3]) // 6
```

```javascript
const { SUM } = require('@formulajs/formulajs') // require individual components

SUM([1, 2, 3]) // 6
```

### Command Line Interface (CLI)

When Formula.js is installed globally using npm, it can be used from the command line. To install Formula.js globally:

```
npm i -g @formulajs/formulajs
```

After installation, Formula.js is available via the command line:

```sh
$ formulajs
> SUM(1,2,3)
6
```

## Differences between Excel functions and Formula.js

### Date

The functions `DATE, DATEVALUE, EDATE, EOMONT, NOW, TODAY`return plain JS Date instead of the serial Excel number.

Copying composite formula directly from Excel into JS will not work out of the box:

```
= DATE(2020,5,9) - DATE(2020,5,8) // Formula.js: 86400000 / Excel: 1
```

It is not recommended to use `DATEVALUE` to parse string representing a date. Formula.js uses `new Date('YOUR STRING')` under the hood. There are better libraries to do this job (for example Moment.js)

## Migration guide

### From Formula.js

If you were previously using [formulajs from Sutoiku](https://www.npmjs.com/package/formulajs), some functions have been
removed, due to dependency simplification.

Text functions:

`FIXED, TEXT, DOLLAR, VALUE`

Math functions:

`MDETERM, MINVERSE, MMULT, MUNIT`

Otherwise, the 2 packages are fully compatible. You can swap them.

### From @handsontable/formulajs

The code of this package is originally forked from @handsontable/formulajs version 2.0.2 (released in January 2020). The
two packages were identical at the time. There is no regression, only fixes and new functions since the fork.

## Historic

Original Formula.js project was developed and maintained by Ismael Chang Ghalimi, with support from Sutoiku and help from
the following contributors: Ilmari Karonen, Sébastien Loisel, Trevor Norris, Roönaän, Hannes Stiebitzhofer.

It was then forked and extended by the [handsontable/formula.js](https://github.com/handsontable/formula.js) mainly
contributed by [@budnix](https://github.com/budnix).

As of September 2023, the repo is officially detached from its Handsontable and Sutoiku origins.
