# Contributing to FormulaJS Crypto Extensions

## Welcome! 👋

Thank you for your interest in contributing to our crypto extensions for FormulaJS! This repository is a fork of the original [FormulaJS](https://github.com/formulajs/formulajs) library, enhanced with crypto-specific formulas for [dSheets.new](https://dsheets.new).

## What is This Project?

This project extends FormulaJS with crypto-specific data blocks and formulas, making it easier to work with blockchain data in dSheets.new. The original FormulaJS is a JavaScript implementation of most Microsoft Excel formula functions, and we've built upon it to add blockchain and crypto-specific functionality.

dSheets.new is:
- Peer-to-peer
- End-to-end encrypted
- Fully decentralized

## Getting Started

### Prerequisites
- Basic understanding of JavaScript/TypeScript
- Familiarity with crypto APIs (Etherscan, etc.)
- Git and GitHub knowledge

### Development Setup
1. Fork this repository
2. Clone your fork
3. Install dependencies
4. Create a new branch for your feature

## Adding a New Crypto Formula

### 1. File Structure
- All crypto-related formulas must be added to `src/crypto.js`
- Function metadata for suggestion box and API key constants should be defined in `src/crypto-constants.js`

### 2. Function Implementation

Here's an example of a well-structured crypto formula:

```javascript
export async function ETHERSCAN(address, page, offset) {
    const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        if (json.result.includes("Invalid API Key")) {
            return `${SERVICE_API_KEY.Etherscan}_MISSING`;
        }
        return json.result;
    } catch (error) {
        return "ERROR IN FETCHING";
    }
}
```

### 3. Return Types

Your formula can return data in two formats:

#### Array of Objects
When returning an array, follow this structure:
```javascript
// Example 1
[
    { data-1 : "data-abcd", data-2: "data-rtyu", data-3: "data-xcvb"},
    { data-1 : "data-qwer", data-2: "data-sdfg", data-3: "data-asdf"}
]
// Example 2
[
    ["data-1", "data-2", "data-3"],
    ["data-abcd", "data-qwer", "data-asdf"],
    ["data-xcvb", "data-bnml", "data-dfgh"]
]
```

This will be automatically rendered in the UI as a table.

#### String
For single-value returns, simply return a string that will update a single UI cell.

### 4. Error Handling
Our crypto formulas use a unified errorMessageHandler to catch and standardize all errors. Each error is represented as an object

```javascript
{ message: string; functionName: string; type: string; reason?: string }
```

#### Built‑in Error Types

- `INVALID_PARAM`: Thrown when input validation (using Zod) fails.

- `MISSING_KEY`: Thrown when a required API key is not found in localStorage.

- `NETWORK_ERROR`: Thrown when an HTTP request returns a non-2xx status (other than rate limits).

- `RATE_LIMIT`: Thrown when status code is 429 or a RateLimitError is encountered.

- `INVALID_API_KEY`: Thrown when the API returns an "Invalid API Key" message.

- `DEFAULT`: A fallback for unexpected errors; includes a reason field.

 #### How to Throw Errors
In your formula, simply throw one of our custom error classes:

```javascript
if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Etherscan)
if (!res.ok) throw new NetworkError('ETHERSCAN', res.status)
throw new ValidationError(`Invalid param: ${param}`)
```

At the end of your function, wrap all logic in `try/catch` and forward to `errorMessageHandler`:

```javascript
export async function ETHERSCAN(...) {
  try {
    // ... validation, fetch, parsing
  } catch (err) {
    return errorMessageHandler(err, 'ETHERSCAN')
  }
}

```


### 5. Function Metadata

Add detailed metadata to enable better search suggestions. Add your function's metadata to the `FUNCTION_LOCALE` section in `src/crypto-constants.js`:

```javascript
{
    // Required fields
    t: number, // id of your function category ( for crypto functions id should be 20 )
    API_KEY: SERVICE_API_KEY, // type of api key e.g SERVICE_API_KEY.etherscan
    LOGO: string, // logo url e.g 'https//....'
    BRAND_COLOR: string, // hexcode of the function brand color e.g #000
    n: string // function name e.g ETHERSCAN
    d: string // description about the function
    p: Parameters[] // array that describes the argument your function should take in. 
}

type Parameter {
  name: string // parameter name e.g page
  details: string // parameter description e.g Page number
  example: string // argument example e.g "X"
  required: "o" | "m" // indicate if parameter is required ( "o" for optional and "m" for required parameters )
  type: string
}
```

### 6. Testing Data Block

- Create a schema for your function in `src/crypto-function-schema` to validate it parameters
- Add it test cases `test/crypto-functions`
- Run `npm run test:crypto` to run tests cases for all crypto functions

## Code Style Guidelines

- Use async/await for asynchronous operations
- Implement proper error handling
- Follow the existing code style
- Add comments for complex logic
- Keep functions focused and single-purpose
- Ensure all crypto-related functions are properly documented

---

Thank you for contributing to our crypto extensions for FormulaJS! 🚀
