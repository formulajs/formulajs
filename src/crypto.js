import { SERVICE_API_KEY } from "./crypto-constants";
import {fromTimeStampToBlock} from './utils/from-timestamp-to-block'
import {CHAIN_ID_MAP, BLOCKSCOUT_CHAINS_MAP, SAFE_CHAIN_MAP, ERROR_MESSAGES_FLAG} from './utils/constants'


export async function BLOCKSCOUT(address, type, chain, startTimestamp, endTimestamp, page, offset) {
  if (!chain) {
    chain = 'ethereum'
  }

  if (!type) {
    return 'TYPE_MISSING'
  }

  if (!startTimestamp) {
    const currentTimestamp = Date.now()
    startTimestamp = currentTimestamp - 30 * 24 * 60 * 60 * 1000
    startTimestamp = Math.floor(startTimestamp / 1000)
  }

  const hostname = BLOCKSCOUT_CHAINS_MAP[chain]

  let requestUrl

  switch (type) {
    case 'stat':
      requestUrl = `${hostname}/api/v2/addresses/${address}/counters`
      break
    case 'txns':
      requestUrl = `${hostname}/api?module=account&action=txlist&address=${address}&start_timestamp=${startTimestamp}&end_timestamp=${endTimestamp}&page=${page}&offset=${offset}&sort=asc`
      break
    case 'tokens':
      requestUrl = `${hostname}/api?module=account&action=tokenlist&address=${address}`
      break
    default:
      return 'INVALID_TYPE'
  }
  try {
    const response = await fetch(requestUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const json = await response.json()

    console.log(json)
    if (json?.result?.includes('Invalid parameter(s)')) {
      return `INVALID_REQUEST_PARAMS`
    }
    if (json?.result?.includes('Not found')) {
      return `ADDRESS_NOT_FOUND`
    }

    if (type === 'stat') {
      /*
      For type === "stat"
      [{transactions_count: "2940",token_transfers_count: "8346015",gas_usage_count: "91296738",validations_count: "0"}]
      */
      return [json]
    }

    /*
    For type === "tokens"
    [{balance: "287933140055877783279",contractAddress: "0x0000019226b5a2e87714daebde6a21e67fa88787",decimals: "18",name: "Doge King",symbol: "DOGEK",type: "ERC-20"}]

    For type === "txns"
    [{blockNumber: '65204', timeStamp: '1439232889', blockHash: '0x3c3c3c3c', nonce: '0',....}]
    */
    return json.result
  } catch (error) {
    return 'ERROR IN FETCHING'
  }
}

export async function ETHERSCAN(address, page, offset) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
  if(!API_KEY){
    return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.MISSING_KEY}`
  }
  // temporary added for testing rate limit flow
  if(API_KEY === 'xxxx'){
  return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`
  }
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page || 1}&offset=${offset || 10}&sort=asc&apikey=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const json = await response.json()
    if (json.result.includes("Invalid API Key")) {
      return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.INVALID_API_KEY}`
    }
    if(json.result.includes('Max rate limit reached')){
      return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`
    }
    /*
    [{blockNumber: '0x1d3d1', timeStamp: '0x5f7e4f', hash: '0x3c3c3c3c', nonce: '0x1',}]
    */
    return json.result;
  } catch (error) {
    return ERROR_MESSAGES_FLAG.DEFAULT
  }
}

export async function COINGECKO(token, vs_currencies) {
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
        return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.INVALID_API_KEY}`
      }
      if(response.status === 429){
        return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`
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
    return ERROR_MESSAGES_FLAG.DEFAULT
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
    if(json.result.includes('Max rate limit reached')){
      return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`
    }
    return json.result;
  } catch (e) {
    console.log(e);
    return ERROR_MESSAGES_FLAG.DEFAULT;
  }
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