import { SERVICE_API_KEY } from "./crypto-constants";
import {fromTimeStampToBlock} from './utils/from-timestamp-to-block'
import {CHAIN_ID_MAP, BLOCKSCOUT_CHAINS_MAP, SAFE_CHAIN_MAP, ERROR_MESSAGES_FLAG} from './utils/constants'
import { handleScanRequest } from "./utils/handle-explorer-request";




export async function FIREFLY(platform, contentType, identifier) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Firefly);
  if (!API_KEY) return `${SERVICE_API_KEY.Firefly}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;

  const baseUrl = "https://openapi.firefly.land/v1/fileverse/fetch";
  const headers = {
    "x-api-key": API_KEY,
  };

  let query = "";
  let type = "";

  // normalize input
  const normalizedId = identifier.trim().replace(/.*\/([^\/]+)$/, "$1"); // extract last part of URL if needed

  if (platform === "farcaster") {
    if (contentType === "posts") {
      type = "farcasterid";
      query = normalizedId;
    } else if (contentType === "replies") {
      type = "farcasterpostid";
      query = normalizedId.startsWith("0x") ? normalizedId : Number(normalizedId).toString();
    } else {
      return `${SERVICE_API_KEY.Firefly}${ERROR_MESSAGES_FLAG.INVALID_TYPE}`;
    }
  } else if (platform === "lens") {
    if (contentType === "posts") {
      type = "lensid";
      query = normalizedId;
    } else if (contentType === "replies") {
      type = "lenspostid";
      query = normalizedId;
    } else {
      return `${SERVICE_API_KEY.Firefly}${ERROR_MESSAGES_FLAG.INVALID_TYPE}`;
    }
  } else {
    return `${SERVICE_API_KEY.Firefly}${ERROR_MESSAGES_FLAG.INVALID_PARAM}`;
  }

  const url = new URL(baseUrl);
  url.searchParams.set("query", query);
  url.searchParams.set("type", type);
  url.searchParams.set("size", "10");
  url.searchParams.set("cursor", "0");

  try {
    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const flattened = Array.isArray(json?.data)
      ? json.data.map(item => ({
          id: item?.id || null,
          author: item?.author?.username || item?.author?.handle || "",
          text: item?.text || item?.metadata?.content?.content || "",
          createdAt: item?.createdAt || "",
          platform: platform,
        }))
      : [];

    return flattened;
  } catch (err) {
    console.error("FIREFLY fetch error:", err);
    return ERROR_MESSAGES_FLAG.DEFAULT;
  }
}


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

export async function BASESCAN(...args) {
  const [type, chain, address, startDate, endDate, page, limit] = args;
  return handleScanRequest({
    scanKey: SERVICE_API_KEY.Basescan,
    baseUrl: 'https://api.basescan.org/api',
    type,
    chain,
    address,
    startDate,
    endDate,
    page,
    offset:limit
  });
}
export async function GNOSISSCAN(...args) {
  const [type, chain, address, startDate, endDate, page, limit] = args;
  return handleScanRequest({
    scanKey: SERVICE_API_KEY.Gnosisscan,
    baseUrl: 'https://api.gnosisscan.io/api',
    type,
    chain,
    address,
    startDate,
    endDate,
    page, 
    offset:limit
  });
}

export async function NEYNAR( 
  fid, 
  viewerFid, 
  sortType, 
  limit, 
  cursor 
) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Neynar);
  if (!API_KEY) return `${SERVICE_API_KEY.Neynar}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;


  const url = new URL('https://api.neynar.com/v2/farcaster/followers');
  url.searchParams.set('fid', fid.toString());
  url.searchParams.set('sort_type', sortType);
  url.searchParams.set('limit', limit.toString());
  if (viewerFid !== null) url.searchParams.set('viewer_fid', viewerFid.toString());
  if (cursor) url.searchParams.set('cursor', cursor);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': API_KEY,
        'x-neynar-experimental': 'false'
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (!json?.users?.length) return [];

    return json.users.map(({ user }) => ({
      username: user.username,
      custody_address: user.custody_address,
      follower_count: user.follower_count,
      country: user.profile?.location?.address?.country || '',
      city: user.profile?.location?.address?.city || ''
    }));
  } catch (err) {
    console.error('NEYNAR_FETCH_FOLLOWERS error:', err);
    return ERROR_MESSAGES_FLAG.DEFAULT;
  }
}
export async function GNOSIS({
  cardId,
  startDate,
  endDate,
  limit = 20,
  offset = 0,
}) {
  const apiKeyKey = SERVICE_API_KEY.GnosisPay
  const API_KEY = window.localStorage.getItem(apiKeyKey);
  if (!API_KEY) return `${apiKeyKey}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;
  if (!cardId) return `${apiKeyKey}${ERROR_MESSAGES_FLAG.INVALID_PARAM}`;

  const url = new URL(`https://api.gnosispay.com/cards/${cardId}/transactions`);
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('offset', offset.toString());

  if (!isNaN(startDate)) {
    url.searchParams.set('startDate', new Date(startDate * 1000).toISOString());
  }

  if (!isNaN(endDate)) {
    url.searchParams.set('endDate', new Date(endDate * 1000).toISOString());
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const json = await res.json();

    if (!Array.isArray(json)) return [];

    return json.map(tx => ({
      createdAt: tx.createdAt,
      clearedAt: tx.clearedAt,
      country: tx.country,
      merchant: tx.merchant,
      billingAmount: tx.billingAmount,
      billingCurrency: tx.billingCurrency,
      transactionAmount: tx.transactionAmount,
      transactionCurrency: tx.transactionCurrency,
      transactionType: tx.transactionType,
      kind: tx.kind,
      status: tx.status || null,
      mcc: tx.mcc,
    }));
  } catch (err) {
    console.error('GNOSISPAY_CARD_TXNS error:', err);
    return ERROR_MESSAGES_FLAG.DEFAULT;
  }
}



export async function ETHERSCAN(...args) {
  const [type, chain, address, startDate, endDate, page, limit] = args;
  return handleScanRequest({
    scanKey: SERVICE_API_KEY.Etherscan,
    baseUrl: 'https://api.etherscan.io/v2/api',
    type,
    chain,
    address,
    startDate,
    endDate,
    page, 
    offset:limit
  });
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
    console.log(error)
    return ERROR_MESSAGES_FLAG.DEFAULT
  }
}

export async function EOA(addresses, category, chains, startTime, endTime, page = 1, offset = 10) {
  try {
    const ADDRESSES = addresses.split(',').map(a => a.trim());
    const CHAINS = typeof chains === 'string' ? chains.split(',').map(c => c.trim()) : chains;

    const flatResults = [];
    const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);

    if (!API_KEY) return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;

    for (const chain of CHAINS) {
      const chainId = CHAIN_ID_MAP[chain];
      if (!chainId) throw new Error('Unsupported chain');

      for (const address of ADDRESSES) {
        let action = category === 'txns' ? 'account.txlist' : 'account.balance';
        let timeQuery = '';

        if (category === 'txns') {
          const startBlock = await fromTimeStampToBlock(startTime, chain, API_KEY);
          const endBlock = await fromTimeStampToBlock(endTime, chain, API_KEY);
          timeQuery = `&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=asc`;
        } else {
          timeQuery = `&tag=latest`;
        }

        const url = `https://api.etherscan.io/v2/api?module=${action.split('.')[0]}&action=${action.split('.')[1]}&address=${address}&chainid=${chainId}&apikey=${API_KEY}${timeQuery}`;

        try {
          const response = await fetch(url);
          if (!response.ok) return `HTTP_${response.status}`;

          const json = await response.json();

          if (json.result?.includes?.('Invalid API Key')) {
            return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.INVALID_API_KEY}`;
          }

          if (json.result?.includes?.('Max rate limit reached')) {
            return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`;
          }

          const entries = Array.isArray(json.result) ? json.result : [json.result];
          for (const entry of entries) {
            flatResults.push({ chain, address, ...entry });
          }
        } catch (e) {
          return ERROR_MESSAGES_FLAG.DEFAULT;
        }
      }
    }

    return flatResults;
  } catch (error) {
    console.log(error);
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