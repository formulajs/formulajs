import { SERVICE_API_KEY } from "./crypto-constants";
import {fromTimeStampToBlock} from './utils/from-timestamp-to-block'
import {CHAIN_API_BASE} from './utils/constants'

export async function ETHERSCAN(address, page, offset) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`

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

export async function OX(address, categories, chain, startTime, endTime) {
  // eslint-disable-next-line no-debugger
  debugger;
  const API_KEYS = {
    ethereum: window.localStorage.getItem(SERVICE_API_KEY.Etherscan),
    gnosis: window.localStorage.getItem(SERVICE_API_KEY.Gnosisscan),
    base: window.localStorage.getItem(SERVICE_API_KEY.Basescan),
  };

  const apiKey = API_KEYS[chain];
  const baseUrl = CHAIN_API_BASE[chain];

  const startBlock = await fromTimeStampToBlock(startTime, chain, apiKey);
  const endBlock = await fromTimeStampToBlock(endTime,  chain, apiKey);

  let action = '';
  if (categories === 'txns') action = 'txlist';
  else if (categories === 'balances') action = 'balance';
  else if (categories === 'portfolio') action = 'tokentx';

  let url = `${baseUrl}?module=account&action=${action}&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const json = await response.json();
    if (json.result?.includes?.("Invalid API Key")) {
      return `${SERVICE_API_KEY[chain.charAt(0).toUpperCase() + chain.slice(1)]}_MISSING`;
    }
    return json.result;
  } catch (e) {
    console.log(e)
    return "ERROR IN FETCHING";
  }
}


export async function FLVURL(token, vs_currencies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{"Yoo": "gotcha"}]);
    }, 10000);
  });
}