# FormulaJS – Fileverse Data Block Powerhouse
Welcome to the collection of data blocks for dSheet.new — your on-chain, privacy-first alternative to G**gle D*cs. dSheet.new is peer-to-peer, end-to-end encrypted, and fully decentralized. Give it a try!

Adding a New Data Block
Follow these steps to add a new data block for use in dSheet.new:

- All data block functions related to crypto must be added to src/crypto.js.

- For example, let's look at a simple data block already present in src/crypto.js:
```
export async function GETTXLIST(address, page, offset) {
    const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`
  
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const json = await response.json()
      if(json.result.includes("Invalid API Key")){
        return `${SERVICE_API_KEY.Etherscan}_MISSING`
      }
      return json.result;
    } catch (error) {
      return "ERROR IN FETCHING"
    }
  }
```
Below is a breakdown of the above function along with key steps to consider when adding a new data block :-

[1] Define API key name in `src/crypto-constants.js` in case if it is needed.

[2] You can now make the API call and process the data.
- Processed data can be returned  as `array of object` or just as `string`
- In the case of an array of objects, it should follow the structure shown below:

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/data-block-res.png" />

The returned `array of objects` will be processed and displayed in the UI as shown below:

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/data-block-ui.png" />

[3] Coming back to `string` type, in this case single UI cell will be updated.

[4] <b>Handling Missing Default API Key</b>, If the API key is not available, return ${SERVICE_API_KEY.Etherscan}_MISSING. When this value is returned, the package will automatically show an input modal allowing the user to enter and save their API key. Once the key is saved, the function will be triggered again automatically.
Example UI for API Key input:

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/api-data-block.png" />

[5] For rest other error you can just return error string like `ERROR IN FETCHING`.

[6] All done with the data block! The final step is to add metadata to enable detailed suggestions when users search for it. An example is provided below :- 

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/suggestion-data-block.png" />
<br></br>
To do this, add a detailed JSON object to the FUNCTION_LOCALE section in src/crypto-constant.js. You can refer to the existing data block entries for guidance.
Note: Make sure to include t: 20, in your JSON object — this field is required.


<!-- # Formula.js

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

As of September 2023, the repo is officially detached from its Handsontable and Sutoiku origins. -->
