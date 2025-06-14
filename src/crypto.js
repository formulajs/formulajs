import { SERVICE_API_KEY } from "./crypto-constants";
import {fromTimeStampToBlock} from './utils/from-timestamp-to-block'
import {CHAIN_ID_MAP, BLOCKSCOUT_CHAINS_MAP, SAFE_CHAIN_MAP, ERROR_MESSAGES_FLAG} from './utils/constants'
import { handleScanRequest } from "./utils/handle-explorer-request";
import {toTimestamp} from './utils/toTimestamp'
import { toEnsName } from "./utils/toEnsName";




export async function FIREFLY(platform, contentType, identifier, start = 0, end = 10) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Firefly);
  if (!API_KEY) return `${SERVICE_API_KEY.Firefly}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;

  const baseUrl = "https://openapi.firefly.land/v1/fileverse/fetch";
  const headers = { "x-api-key": API_KEY };

  const typeMap = {
    farcaster: {
      posts: "farcasterid",
      replies: "farcasterpostid",
      channels: "farcasterchannels",
    },
    lens: {
      posts: "lensid",
      replies: "lenspostid",
    }
  };

  const platformType = typeMap[platform]?.[contentType];
  if (!platformType) return `${SERVICE_API_KEY.Firefly}${ERROR_MESSAGES_FLAG.INVALID_TYPE}`;

  const query = identifier
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .join(",");

  const url = new URL(baseUrl);
  url.searchParams.set("query", query);
  url.searchParams.set("type", platformType);
  url.searchParams.set("start", String(start));
  url.searchParams.set("end", String(end));

  try {
    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (!Array.isArray(json?.data)) return [];

    return json.data.map(item => {
      const flat = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value !== "object" || value === null) {
          flat[key] = value;
        }
      }
      flat.platform = platform;
      return flat;
    });

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

  if(isNaN(startTimestamp)){
    startTimestamp = toTimestamp(startTimestamp)
  }


  if(isNaN(endTimestamp) && endTimestamp){
    endTimestamp = toTimestamp(endTimestamp)
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
export async function GNOSISPAY({
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

  if (!isNaN(toTimestamp(startDate))) {
    url.searchParams.set('startDate', new Date(startDate * 1000).toISOString());
  }

  if (!isNaN(toTimestamp(endDate))) {
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


export async function COINGECKO(category, param1, param2, page = 1, perPage = 2) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Coingecko);
  if (!API_KEY) return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;

  const headers = {
    accept: 'application/json',
    'x-cg-demo-api-key': API_KEY,
  };

  let url = '';

  switch ((category || '').toLowerCase()) {
    case 'price': {
      const token = param1;
      const vsCurrencies = param2;
      if (!token || !vsCurrencies) return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.INVALID_PARAMS}`;
      url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${vsCurrencies}&ids=${token}`;
      break;
    }

    case 'market': {
      const ecosystemMap = {
        eth: 'ethereum-ecosystem',
        base: 'base-ecosystem',
        sol: 'solana-ecosystem',
        gnosis: 'gnosis-chain',
        hyperliquid: 'hyperliquid',
        bitcoin: 'bitcoin-ecosystem',
        pump: 'pump-ecosystem',
      };

      const key = param1?.toLowerCase();
      const categoryVal = key ? ecosystemMap[key] : '';

      if (param1 && !categoryVal) {
        return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.INVALID_PARAM}`;
      }

      const trend = param2 ? `&price_change_percentage=${param2}` : '';
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&include_tokens=top&page=${page}&per_page=${perPage}`;
      if (categoryVal) url += `&category=${categoryVal}`;
      if (trend) url += trend;
      break;
    }

    case 'stablecoins': {
      const category = param1 === 'all' || !param1
        ? 'stablecoins'
        : param1?.toLowerCase();
      const trend = param2 ? `&price_change_percentage=${param2}` : '';

      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&category=${category}&page=${page}&per_page=${perPage}${trend}`;
      break;
    }

    case 'derivatives': {
      const exchange = param1;
      if (exchange) {
        url = `https://api.coingecko.com/api/v3/derivatives/exchanges/${exchange}?include_tickers=all`;
      } else {
        url = `https://api.coingecko.com/api/v3/derivatives?page=${page}&per_page=${perPage}`;
      }
      break;
    }

    default:
      return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.INVALID_PARAMS}`;
  }

  try {
    const response = await fetch(url, { method: 'GET', headers });
    const json = await response.json();

    if (!response.ok) {
      const message = json?.status?.error_message || '';
      if (message.includes('API Key Missing')) {
        return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.INVALID_API_KEY}`;
      }
      if (response.status === 429) {
        return `${SERVICE_API_KEY.Coingecko}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`;
      }
    }

    if (category.toLowerCase() === 'price') {
      const output = {};
      for (const [token, prices] of Object.entries(json)) {
        for (const [currency, value] of Object.entries(prices)) {
          const key = `${token.charAt(0).toUpperCase() + token.slice(1)}_${currency.toUpperCase()}`;
          output[key] = value;
        }
      }
      return [output];
    }

    const flatArray = Array.isArray(json) ? json : [json];
    return flatArray.map(item => {
      const flat = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value !== 'object' || value === null) {
          flat[key] = value;
        }
      }
      return flat;
    });
  } catch (error) {
    console.error(error);
    return ERROR_MESSAGES_FLAG.DEFAULT;
  }
}




export async function EOA(
  addresses,
  category,
  chains,
  startTime,
  endTime,
  page = 1,
  offset = 10,
) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
  if (!API_KEY) return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;

  const INPUTS = addresses.split(",").map(a => a.trim()).filter(Boolean);
  const CHAINS = chains.split(",").map(c => c.trim()).filter(Boolean);
  const out = [];

  // Map: finalAddress => ENS name (if applicable)
  const ADDRESS_MAP = {};

  for (const input of INPUTS) {
    if (/^0x[a-fA-F0-9]{40}$/.test(input)) {
      ADDRESS_MAP[input.toLowerCase()] = null; // it's a direct address
    } else {
      try {
        const resolved = await toEnsName(input); // ENS -> address
        if (resolved) ADDRESS_MAP[resolved.toLowerCase()] = input;
      } catch {
        return `${input}${ERROR_MESSAGES_FLAG.INVALID_PARAM}`;
      }
    }
  }

  const ADDRS = Object.keys(ADDRESS_MAP);

  for (const chain of CHAINS) {
    const chainId = CHAIN_ID_MAP[chain];
    if (!chainId) return ERROR_MESSAGES_FLAG.UNSUPPORTED_CHAIN;

    if (category === "balance") {
      for (let i = 0; i < ADDRS.length; i += 20) {
        const slice = ADDRS.slice(i, i + 20).join(",");
        const action = ADDRS.length > 1 ? "balancemulti" : "balance";

        const url =
          `https://api.etherscan.io/v2/api?chainid=${chainId}` +
          `&module=account&action=${action}&address=${slice}` +
          `&tag=latest&apikey=${API_KEY}`;

        const data = await fetchJSON(url);
        if (typeof data === "string") return data;

        (Array.isArray(data) ? data : [data]).forEach(r =>
          out.push({
            chain,
            ...r,
            name: ADDRESS_MAP[(r.account || r.address || "").toLowerCase()] || null,
          }),
        );
      }
      continue;
    }

    if (category === "txns") {
      const startBlock = await fromTimeStampToBlock(toTimestamp(startTime), chain, API_KEY);
      const endBlock = await fromTimeStampToBlock(toTimestamp(endTime), chain, API_KEY);

      for (const addr of ADDRS) {
        const url =
          `https://api.etherscan.io/v2/api?chainid=${chainId}` +
          `&module=account&action=txlist&address=${addr}` +
          `&startblock=${startBlock}&endblock=${endBlock}` +
          `&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`;

        const data = await fetchJSON(url);
        if (typeof data === "string") return data;

        data.forEach(tx =>
          out.push({
            chain,
            address: addr,
            name: ADDRESS_MAP[addr],
            ...tx,
          }),
        );
      }
      continue;
    }

    return ERROR_MESSAGES_FLAG.INVALID_CATEGORY;
  }

  return out;

  async function fetchJSON(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return `HTTP_${res.status}`;

      const json = await res.json();

      if (json.result?.includes?.("Invalid API Key"))
        return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.INVALID_API_KEY}`;

      if (json.result?.includes?.("Max rate limit reached"))
        return `${SERVICE_API_KEY.Etherscan}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`;

      if (json.status === "0" && json.message !== "No transactions found")
        return ERROR_MESSAGES_FLAG.DEFAULT;

      return json.result;
    } catch {
      return ERROR_MESSAGES_FLAG.DEFAULT;
    }
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