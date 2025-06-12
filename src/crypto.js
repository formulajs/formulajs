import { SERVICE_API_KEY } from "./crypto-constants";
import {fromTimeStampToBlock} from './utils/from-timestamp-to-block'
import { CHAIN_ID_MAP, SAFE_CHAIN_MAP } from './utils/constants'
import * as utils from './utils/common.js'

export async function ETHERSCAN(address, page, offset) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page || 1}&offset=${offset || 10}&sort=asc&apikey=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const json = await response.json()
    if (json.result.includes("Invalid API Key")) {
      return `${SERVICE_API_KEY.Etherscan}_MISSING`
    }
    /*
    [{blockNumber: '0x1d3d1', timeStamp: '0x5f7e4f', hash: '0x3c3c3c3c', nonce: '0x1',}]
    */
    return json.result;
  } catch (error) {
    return "ERROR IN FETCHING"
  }
}

export async function GETPRICE(token, vs_currencies) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Coingecko);
  const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${vs_currencies}&ids=${token}`;

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': `${API_KEY}` },
  };

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const json = await response.json()
      if (json.status.error_message.includes("API Key Missing")) {
        return `${SERVICE_API_KEY.Coingecko}_MISSING`
      }
    }
    const jsonResponse = await response.json()

    // Free Coingecko API does not require API key, not need to handle API key error

    const output = {};
    for (const [coin, prices] of Object.entries(jsonResponse)) {
      for (const [currency, value] of Object.entries(prices)) {
        const key = `${coin.charAt(0).toUpperCase() + coin.slice(1)}_${currency.toUpperCase()}`;
        output[key] = value;
      }
    }
    /*
    [{Bitcon_usd: 1, Bitcoin_eur: 1},{Ethereum_usd: 1, Ethereum_eur: 1}}]
    */
    return [output];
  } catch (error) {
    return "ERROR IN FETCHING"
  }
}

export async function EOA(address, categories, chain, startTime, endTime) {
  const API_KEYS = {
    ethereum: window.localStorage.getItem(SERVICE_API_KEY.Etherscan),
    gnosis: window.localStorage.getItem(SERVICE_API_KEY.Gnosisscan),
    base: window.localStorage.getItem(SERVICE_API_KEY.Basescan),
  };
  const apiKey = API_KEYS[chain];
  const chainId = CHAIN_ID_MAP[chain];
  if (!apiKey || !chainId) return `${chain.toUpperCase()}_MISSING`;

  let action = '';
  if (categories === 'txns') action = 'account.txlist';
  else { action = 'account.balance' };
  let timeQuery = ''
  if (!isNaN(startTime) && !isNaN(endTime)) {
    const startBlock = await fromTimeStampToBlock(startTime, chain, apiKey);
    const endBlock = await fromTimeStampToBlock(endTime, chain, apiKey);
    timeQuery = `&startblock=${startBlock}&endblock=${endBlock}`
  } else if (categories === 'balance') {
    timeQuery = `&tag=latest`
  } else {
    throw new Error('Start and End Time is required for querying transaction list ')
  }
  const url = `https://api.etherscan.io/v2/api?module=${action.split('.')[0]}&action=${action.split('.')[1]}&address=${address}&sort=asc&chainid=${chainId}&apikey=${apiKey}${timeQuery}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const json = await response.json();
    if (json.result?.includes?.("Invalid API Key")) {
      return `${SERVICE_API_KEY[chain.charAt(0).toUpperCase() + chain.slice(1)]}_MISSING`;
    }
    return json.result;
  } catch (e) {
    console.log(e);
    return "ERROR IN FETCHING";
  }
}


export function PNL() {
  const [A, B] = utils.argsToArray(arguments);

  const toNumberOrThrow = (val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error(`Invalid number value: ${val}`);
    return num;
  };

  // Single numbers
  if (typeof A === "number" && typeof B === "number") {
    return A - B;
  }

  // 1D arrays
  if (Array.isArray(A) && Array.isArray(B) && typeof A[0] !== "object") {
    const maxLen = Math.max(A.length, B.length);
    let total = 0;
    for (let i = 0; i < maxLen; i++) {
      const aVal = i < A.length ? toNumberOrThrow(A[i]) : 0;
      const bVal = i < B.length ? toNumberOrThrow(B[i]) : 0;
      total += aVal - bVal;
    }
    return total;
  }

  // 2D arrays
  if (Array.isArray(A[0]) && typeof A[0][0] !== "object") {
    let total = 0;
    const maxRows = Math.max(A.length, B.length);
    for (let i = 0; i < maxRows; i++) {
      const rowA = A[i] || [];
      const rowB = B[i] || [];
      const maxCols = Math.max(rowA.length, rowB.length);
      for (let j = 0; j < maxCols; j++) {
        const aVal = j < rowA.length ? toNumberOrThrow(rowA[j]) : 0;
        const bVal = j < rowB.length ? toNumberOrThrow(rowB[j]) : 0;
        total += aVal - bVal;
      }
    }
    return total;
  }

  // 3D arrays
  if (Array.isArray(A[0][0])) {
    let total = 0;
    const maxX = Math.max(A.length, B.length);
    for (let i = 0; i < maxX; i++) {
      const matA = A[i] || [];
      const matB = B[i] || [];
      const maxY = Math.max(matA.length, matB.length);
      for (let j = 0; j < maxY; j++) {
        const rowA = matA[j] || [];
        const rowB = matB[j] || [];
        const maxZ = Math.max(rowA.length, rowB.length);
        for (let k = 0; k < maxZ; k++) {
          const aVal = k < rowA.length ? toNumberOrThrow(rowA[k]) : 0;
          const bVal = k < rowB.length ? toNumberOrThrow(rowB[k]) : 0;
          total += aVal - bVal;
        }
      }
    }
    return total;
  }

  throw new Error("Unsupported or mismatched structure");
}


export async function FLVURL(token, vs_currencies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ "Yoo": "gotcha" }]);
    }, 10000);
  });
}

export async function SAFE(address, utility, chain, limit, offset) {

  if (typeof limit !== 'number' || limit < 0) return 'INVALID_LIMIT';
  if (typeof offset !== 'number' || offset < 0) return 'INVALID_OFFSET';
  if (utility !== 'txns') return 'UTILITY IS NOT SUPPORTED';

  const apiKey = window.localStorage.getItem(SERVICE_API_KEY.Safe);
  const chainIdentifier = SAFE_CHAIN_MAP[chain];

  if (!apiKey) return `${SERVICE_API_KEY.Safe}_MISSING`;
  if (!chainIdentifier) return 'CHAIN IS NOT SUPPORTED';

  const url = `https://api.safe.global/tx-service/${chainIdentifier}/api/v2/safes/${address}/multisig-transactions?limit=${limit}&offset=${offset}`;
  try {
    const response = await fetch(url,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const json = await response.json();
    if (!Array.isArray(json.results)) {
      return "INVALID API RESPONSE";
    }
    // remove nested structure from the response
    return json.results.map(({ confirmations, dataDecoded, ...rest }) => rest);
  } catch (e) {
    console.log(e);
    return "ERROR IN FETCHING";
  }
}