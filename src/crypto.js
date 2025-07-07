/* global window */

import { SERVICES_API_KEY } from './crypto-constants.js'
import * as fromTimeStampToBlockUtil from './utils/from-timestamp-to-block.js'
import {
  CHAIN_ID_MAP,
  BLOCKSCOUT_CHAINS_MAP,
  SAFE_CHAIN_MAP,
} from './utils/constants.js'
import { handleScanRequest } from './utils/handle-explorer-request.js'
import { toTimestamp } from './utils/toTimestamp.js'
import * as isAddressUtil from './utils/is-address.js'
import * as fromEnsNameToAddressUtil from './utils/from-ens-name-to-address.js'
import * as fromUsernameToFidUtil  from './utils/from-username-to-fid.js'
import * as utils from './utils/common.js'
import { errorMessageHandler, validateParams } from './utils/error-messages-handler.js'
import { fireflyParamsSchema, fireFlyPlaformType } from './crypto-function-schema/firefly.js'
import { lensParamsSchema } from './crypto-function-schema/lens-schema.js'
import { farcasterParamsSchema } from './crypto-function-schema/farcaster-schema.js'
import { blockscoutParamsSchema} from './crypto-function-schema/blockscout-schema.js'
import {MissingApiKeyError, NetworkError, EnsError, ValidationError, InvalidApiKeyError, RateLimitError } from './utils/error-instances.js'
import { baseParamsSchema } from './crypto-function-schema/base-schema.js'
import { z } from 'zod'
import { etherscanParamsSchema } from './crypto-function-schema/etherscan-schema.js'
import { coingeckoParamsSchema } from './crypto-function-schema/coingecko-schema.js'
import { eoaParamsSchema } from './crypto-function-schema/eoa-schema.js'
import { safeParamsSchema } from './crypto-function-schema/safe-schema.js'
import { CATEGORY_URLS, defillamaParamsSchema } from './crypto-function-schema/defillama-schema.js'
import { uniswapParamsSchema } from './crypto-function-schema/uniswap-schema.js'
import { aaveParamsSchema } from './crypto-function-schema/aave-schema.js'


export async function FIREFLY() {
  try {
  const [platform, contentType, identifier, start = 0, end = 10] = utils.argsToArray(arguments)

validateParams(fireflyParamsSchema, {
      platform,
      contentType,
      identifier,
      start,
      end,
    })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Firefly)
    if (!apiKey) {
      throw new MissingApiKeyError(SERVICES_API_KEY.Firefly)
    }

    const url = new URL('https://openapi.firefly.land/v1/fileverse/fetch')
    url.searchParams
      .set('query',
        identifier
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
          .join(',')
      )
      url.searchParams.set('type',  fireFlyPlaformType[platform][contentType])
          url.searchParams.set('start', String(start))
          url.searchParams.set('end',   String(end))

    const response = await fetch(url.toString(), {
      headers: { 'x-api-key': apiKey }
    })
    if (!response.ok) {
      throw new NetworkError(SERVICES_API_KEY.Firefly, response.status)
    }

    const { data } = await response.json()
    if (!Array.isArray(data)) {
      return []
    }
    return data.map(item => {
      const flat = {}
      for (const [key, value] of Object.entries(item)) {
        if (typeof value !== 'object' || value === null) {
          flat[key] = value
        }
      }
      flat.platform = platform
      return flat
    })

  } catch (err) {
    return errorMessageHandler(err, 'FIREFLY')
  }
}


export async function LENS() {
  try {
    const [contentType, identifier, start = 0, end = 10] =
      utils.argsToArray(arguments)

    validateParams(lensParamsSchema, {
      contentType,
      identifier,
      start,
      end,
    })

    const apiKey = window.localStorage.getItem(
      SERVICES_API_KEY.Firefly
    )
    if (!apiKey) {
      throw new MissingApiKeyError(SERVICES_API_KEY.Firefly)
    }

    const url = new URL(
      'https://openapi.firefly.land/v1/fileverse/fetch'
    )
    url.searchParams.set(
      'query',
      identifier
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .join(',')
    )
    const typeMap = {
      posts:   'lensid',
      replies: 'lenspostid',
    }
    url.searchParams.set('type', typeMap[contentType])
    url.searchParams.set('start', String(start))
    url.searchParams.set('end',   String(end))

    const response = await fetch(url.toString(), {
      headers: { 'x-api-key': apiKey },
    })
    if (!response.ok) {
      throw new NetworkError(SERVICES_API_KEY.Firefly, response.status)
    }

    const { data } = await response.json()
    if (!Array.isArray(data)) return []

    return data.map((item) => {
      const flat = {}
      for (const [key, value] of Object.entries(item)) {
        if (value == null || typeof value !== 'object') {
          flat[key] = value
        }
      }
      flat.platform = 'lens'
      return flat
    })
  } catch (err) {
    return errorMessageHandler(err, 'LENS')
  }
}
export async function FARCASTER() {
  try {
    const [contentType, identifier, start = 0, end = 10] =
      utils.argsToArray(arguments)
validateParams(farcasterParamsSchema, {
      contentType,
      identifier,
      start,
      end,
    })

    const apiKey = window.localStorage.getItem(
      SERVICES_API_KEY.Firefly
    )
    if (!apiKey) {
      throw new MissingApiKeyError(SERVICES_API_KEY.Firefly)
    }

    const url = new URL(
      'https://openapi.firefly.land/v1/fileverse/fetch'
    )
    url.searchParams.set(
      'query',
      identifier
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .join(',')
    )
    const typeMap = {
  posts:    'farcasterid',
  replies:  'farcasterpostid',
  channels: 'farcasterchannels',
}
    url.searchParams.set('type', typeMap[contentType])
    url.searchParams.set('start', String(start))
    url.searchParams.set('end',   String(end))

    const response = await fetch(url.toString(), {
      headers: { 'x-api-key': apiKey },
    })
    if (!response.ok) {
      throw new NetworkError(
        SERVICES_API_KEY.Firefly,
        response.status
      )
    }

    const { data } = await response.json()
    if (!Array.isArray(data)) return []

    return data.map(item => {
      const flat = {}
      for (const [k, v] of Object.entries(item)) {
        if (v == null || typeof v !== 'object') {
          flat[k] = v
        }
      }
      flat.platform = 'farcaster'
      return flat
    })
  } catch (err) {
    return errorMessageHandler(err, 'FARCASTER')
  }
}


export async function BLOCKSCOUT() {
  try {
    const [
      address,
      type,
      chain = 'ethereum',
      startTimestamp,
      endTimestamp,
      page,
      offset,
    ] = utils.argsToArray(arguments)

    validateParams(blockscoutParamsSchema, {
      address,
      type,
      chain,
      startTimestamp,
      endTimestamp,
      page,
      offset
    })

    const startTs =
      startTimestamp ?? Math.floor((Date.now() - 30 * 24 * 3600 * 1000) / 1000)
    const endTs = endTimestamp

    let resolvedAddress = address
    if (!isAddressUtil.default.isAddress(resolvedAddress)) {
      const ensName = resolvedAddress
      resolvedAddress = await fromEnsNameToAddressUtil.default.fromEnsNameToAddress(ensName)
      if (!resolvedAddress) {
        throw new EnsError(ensName)
      }
    }

    const hostname = BLOCKSCOUT_CHAINS_MAP[chain]

    let requestUrl
    switch (type) {
      case 'stat':
        requestUrl = `${hostname}/api/v2/addresses/${resolvedAddress}/counters`
        break
      case 'txns':
        requestUrl =
          `${hostname}/api?module=account&action=txlist` +
          `&address=${resolvedAddress}` +
          `&start_timestamp=${startTs}` +
          `&end_timestamp=${endTs ?? ''}` +
          `&page=${page}` +
          `&offset=${offset}` +
          `&sort=asc`
        break
      case 'tokens':
        requestUrl =
          `${hostname}/api?module=account&action=tokenlist` +
          `&address=${resolvedAddress}`
        break
    }

    const response = await fetch(requestUrl)
    if (!response.ok) {
      throw new NetworkError('BLOCKSCOUT', response.status)
    }

    const json = await response.json()

    // custom error conditions
    if (json?.result?.includes('Invalid parameter(s)')) {
      throw new ValidationError('Invalid parameters')
    }
    if (json?.result?.includes('Not found')) {
      throw new ValidationError('Address information not found')
    }

    return type === 'stat' ? [json] : json.result
  } catch (err) {
    return errorMessageHandler(err, 'BLOCKSCOUT')
  }
}

export async function BASE() {
try {
    const [type, address, startDate, endDate, page, limit] = utils.argsToArray(arguments)
   validateParams(baseParamsSchema, { type, address, startDate, endDate, page, limit })
    const API_KEY = window.localStorage.getItem(SERVICES_API_KEY.Basescan)
    if (!API_KEY) throw new MissingApiKeyError(SERVICES_API_KEY.Basescan)
  
    return await handleScanRequest({
      type,
      address,
      startDate,
      endDate,
      page,
      offset: limit,
      apiKey: API_KEY,
      functionName: 'BASE',
      chainId: CHAIN_ID_MAP.base,
      network: 'base'
    })
} catch (error) {
  return errorMessageHandler(error, 'BASE')
}
}
export async function GNOSIS() {
  try {
    const [type, address, startDate, endDate, page = 1, limit = 10] =
      utils.argsToArray(arguments)

    // same validation rules as BASE
    validateParams(baseParamsSchema, {
      type,
      address,
      startDate,
      endDate,
      page,
      limit,
    })

    const apiKey = window.localStorage.getItem(
      SERVICES_API_KEY.Gnosisscan
    )
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Gnosisscan)

    return await handleScanRequest({
      type,
      address,
      startDate,
      endDate,
      page,
      offset: limit,
      apiKey,
      functionName: 'GNOSIS',
      chainId: CHAIN_ID_MAP.gnosis,
      network: 'gnosis',
    })
  } catch (err) {
    return errorMessageHandler(err, 'GNOSIS')
  }
}

export async function NEYNAR() {
  try {
     const neynarParamsSchema = z.object({
  username: z.string().nonempty()
})

    const [username] = utils.argsToArray(arguments)

    validateParams(neynarParamsSchema, { username })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Neynar)
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Neynar)

    const fid = await fromUsernameToFidUtil.default.fromUsernameToFid(username, apiKey)
    if (!fid) throw new ValidationError(`Invalid username: ${username}`)

    const url = `https://api.neynar.com/v2/farcaster/followers?fid=${fid}`

    const response = await fetch(url, {
      headers: {
        'x-api-key': apiKey,
        'x-neynar-experimental': 'false',
      }
    })
    if (!response.ok) {
      throw new NetworkError(SERVICES_API_KEY.Neynar, response.status)
    }

    const json = await response.json()
    const users = json?.users || []
    if (!users.length) return []

    return users.map(({ user }) => ({
      username: user.username,
      custody_address: user.custody_address,
      follower_count: user.follower_count,
      country: user.profile?.location?.address?.country || '',
      city: user.profile?.location?.address?.city || '',
    }))
  } catch (err) {
    return errorMessageHandler(err, 'NEYNAR')
  }
}

// export async function GNOSISPAY({
//   cardId,
//   startDate,
//   endDate,
//   limit = 20,
//   offset = 0,
// }) {
//   const apiKeyKey = SERVICES_API_KEY.GnosisPay
//   const API_KEY = window.localStorage.getItem(apiKeyKey);
//   if (!API_KEY) return `${apiKeyKey}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;
//   if (!cardId) return `${apiKeyKey}${ERROR_MESSAGES_FLAG.INVALID_PARAM}`;
//     if(limit > MAX_PAGE_LIMIT){
//     return ERROR_MESSAGES_FLAG.MAX_PAGE_LIMIT
//   }

//   const url = new URL(`https://api.gnosispay.com/cards/${cardId}/transactions`);
//   url.searchParams.set('limit', limit.toString());
//   url.searchParams.set('offset', offset.toString());

//   if (!isNaN(toTimestamp(startDate))) {
//     url.searchParams.set('startDate', new Date(startDate * 1000).toISOString());
//   }

//   if (!isNaN(toTimestamp(endDate))) {
//     url.searchParams.set('endDate', new Date(endDate * 1000).toISOString());
//   }

//   try {
//     const res = await fetch(url.toString(), {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

//     const json = await res.json();

//     if (!Array.isArray(json)) return [];

//     return json.map(tx => ({
//       createdAt: tx.createdAt,
//       clearedAt: tx.clearedAt,
//       country: tx.country,
//       merchant: tx.merchant,
//       billingAmount: tx.billingAmount,
//       billingCurrency: tx.billingCurrency,
//       transactionAmount: tx.transactionAmount,
//       transactionCurrency: tx.transactionCurrency,
//       transactionType: tx.transactionType,
//       kind: tx.kind,
//       status: tx.status || null,
//       mcc: tx.mcc,
//     }));
//   } catch (err) {
//     console.error('GNOSISPAY_CARD_TXNS error:', err);
//     return ERROR_MESSAGES_FLAG.DEFAULT;
//   }
// }

export async function ETHERSCAN() {
  try {
    const [type, chain, address, startDate, endDate, page = 1, limit = 10] =
      utils.argsToArray(arguments)


    validateParams(etherscanParamsSchema, { type, chain, address, startDate, endDate, page, limit })

    const chainId = CHAIN_ID_MAP[chain]
    if (!chainId) throw new ValidationError(`Invalid chain: ${chain}`)

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Etherscan)
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Etherscan)

    return await handleScanRequest({
      type,
      address,
      startDate,
      endDate,
      page,
      offset: limit,
      apiKey,
      functionName: 'ETHERSCAN',
      chainId,
      network: chain,
    })
  } catch (err) {
    return errorMessageHandler(err, 'ETHERSCAN')
  }
}


export async function COINGECKO() {
  try {
    const [category, param1, param2] = utils.argsToArray(arguments)
    validateParams(coingeckoParamsSchema, { category, param1, param2 })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Coingecko)
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Coingecko)

    const headers = {
      accept: 'application/json',
      'x-cg-demo-api-key': apiKey,
    }
    let url = ''
    switch (category?.toLowerCase?.()) {
      case 'price': {
        const vs = param2 || 'usd'
        url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${vs}&symbols=${param1}`
        break
      }
      case 'market': {
        const map = { all:'', base:'base-ecosystem', meme:'meme-token', aiagents:'ai-agents', bitcoin:'bitcoin-ecosystem', ethereum:'ethereum-ecosystem', hyperliquid:'hyperliquid-ecosystem', pump:'pump-ecosystem', solana:'solana-ecosystem' }
        const _category = map[param1] || ''
        const trend = param2 ? `&price_change_percentage=${param2}` : ''
        url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&include_tokens=top&page=1&per_page=100${_category?`&category=${_category}`:''}${trend}`
        break
      }
      case 'stablecoins': {
        const _category = param1==='all'? 'stablecoins' : param1
        const trend = param2 ? `&price_change_percentage=${param2}` : ''
        url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${_category}&order=market_cap_desc&page=1&per_page=100${trend}`
        break
      }
      case 'derivatives': {
        url = (!param1 || param1==='all')
          ? 'https://api.coingecko.com/api/v3/derivatives'
          : `https://api.coingecko.com/api/v3/derivatives/exchanges/${param1}?include_tickers=all`
        break
      }
    }

    const res = await fetch(url, { headers })
    const json = await res.json()
    if (!res.ok) {
      const msg = json?.status?.error_message || ''
      if (msg.includes('API Key Missing')) throw new InvalidApiKeyError(SERVICES_API_KEY.Coingecko)
      throw new NetworkError(SERVICES_API_KEY.Coingecko, res.status)
    }

    if (category==='price') {
      const out = {}
      for (const [token, prices] of Object.entries(json))
        for (const [cur,val] of Object.entries(prices))
          out[`${token.charAt(0).toUpperCase()+token.slice(1)}_${cur.toUpperCase()}`]=val
      return [out]
    }

    const data = Array.isArray(json) ? json : [json]
    return data.map(item=>{
      const flat={}
      for (const [key, value] of Object.entries(item)) {
        if (typeof value !== 'object' || value === null) {
          flat[key] = value
        }
      }
      return flat
    })
  } catch(err) {
    return errorMessageHandler(err,'COINGECKO')
  }
}

export async function EOA() {
  try {
    const [addresses, category, chains, startTime, endTime, page = 1, offset = 10] =
      utils.argsToArray(arguments)
    validateParams(eoaParamsSchema, { addresses, category, chains, startTime, endTime, page, offset })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Etherscan)
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Etherscan)

    const INPUTS = addresses.split(',').map(s=>s.trim()).filter(Boolean)
    const CHAINS = chains.split(',').map(s=>s.trim()).filter(Boolean)

    const ADDRESS_MAP = {}
    for (const inp of INPUTS) {
      if (isAddressUtil.default.isAddress(inp)) {
        ADDRESS_MAP[inp.toLowerCase()] = null
      } else {
        const ens = inp
        const resolved = await fromEnsNameToAddressUtil.default.fromEnsNameToAddress(ens)
        if (!resolved) throw new EnsError(ens)
        ADDRESS_MAP[resolved.toLowerCase()] = ens
      }
    }
    const ADDRS = Object.keys(ADDRESS_MAP)
    const out = []

    async function fetchJSON(url) {
      const res = await fetch(url)
      if (!res.ok) throw new NetworkError(SERVICES_API_KEY.Etherscan, res.status)
      const json = await res.json()

      if (typeof json.result === 'string') {
        if (json.result.includes('Invalid API Key')) throw new InvalidApiKeyError(SERVICES_API_KEY.Etherscan)
        if (json.result.includes('Max rate limit reached')) throw new RateLimitError(SERVICES_API_KEY.Etherscan)
      }
      return json.result
    }


    for (const chain of CHAINS) {
      const chainId = CHAIN_ID_MAP[chain]
      if (!chainId) throw new ValidationError(`Invalid chain: ${chain}`)

      if (category === 'balance') {
        // chunk 20
        for (let i=0; i<ADDRS.length; i+=20) {
          const slice = ADDRS.slice(i,i+20).join(',')
          const url =
            `https://api.etherscan.io/v2/api?chainid=${chainId}`+
            `&module=account&action=addresstokenbalance&address=${slice}`+
            `&page=${page}&offset=${offset}&apikey=${apiKey}`
          const data = await fetchJSON(url)
          if (!Array.isArray(data)) return data
          data.forEach((item, idx) => out.push({ chain, address: ADDRS[i+idx], name: ADDRESS_MAP[ADDRS[i+idx]], ...item }))
        }
      } else {
        // txns
        const sb = await fromTimeStampToBlockUtil.default.fromTimeStampToBlock(toTimestamp(startTime), chain, apiKey)
        const eb = await fromTimeStampToBlockUtil.default.fromTimeStampToBlock(toTimestamp(endTime), chain, apiKey)
        if (!sb) throw new ValidationError(`Invalid startTime: ${startTime}`)
        if (!eb) throw new ValidationError(`Invalid endTime: ${endTime}`)
        for (const addr of ADDRS) {
          const url =
            `https://api.etherscan.io/v2/api?chainid=${chainId}`+
            `&module=account&action=tokentx&address=${addr}`+
            `&startblock=${sb}&endblock=${eb}`+
            `&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`
          const data = await fetchJSON(url)
          if (!Array.isArray(data)) return data
          data.forEach(item => out.push({ chain, address: addr, name: ADDRESS_MAP[addr], ...item }))
        }
      }
    }
    return out
  } catch (err) {
    return errorMessageHandler(err, 'EOA')
  }
}

export async function FLVURL(token, vs_currencies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ Yoo: 'gotcha' }])
    }, 10000)
  })
}

export async function SAFE() {
  try {
    const [address, utility, chain, limit = 10, offset = 0] = utils.argsToArray(arguments)

    validateParams(safeParamsSchema, { address, utility, chain, limit, offset })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Safe)
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Safe)

    const chainId = SAFE_CHAIN_MAP[chain]
    if (!chainId) throw new ValidationError(`Invalid chain: ${chain}`)

    let resolved = address
    if (!isAddressUtil.default.isAddress(resolved)) {
      const ens = resolved
      resolved = await fromEnsNameToAddressUtil.default.fromEnsNameToAddress(ens)
      if (!resolved) throw new EnsError(ens)
    }


    const url = `https://api.safe.global/tx-service/${chainId}/api/v2/safes/${resolved}/multisig-transactions?limit=${limit}&offset=${offset}`


    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } })
    if (!res.ok) throw new NetworkError(SERVICES_API_KEY.Safe, res.status)
    const json = await res.json()

    if (!Array.isArray(json.results)) {
      throw new ValidationError('Invalid API response')
    }


    return json.results.map(({ confirmations, dataDecoded, ...rest }) => rest)
  } catch (err) {
    return errorMessageHandler(err, 'SAFE')
  }
}


export async function DEFILLAMA() {
  try {
    const [category] = utils.argsToArray(arguments)
    validateParams(defillamaParamsSchema, { category })
    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Defillama)
    if (!apiKey) throw new MissingApiKeyError(SERVICES_API_KEY.Defillama)
    const url = CATEGORY_URLS[category]
    if (!url) throw new ValidationError(`Invalid category: ${category}`)
    const res = await fetch(url)
    if (!res.ok) throw new NetworkError(SERVICES_API_KEY.Defillama, res.status)
    let json = await res.json()

    switch (category) {
      case 'protocols':
        json = Array.isArray(json) ? json.slice(0,500) : []
        break
      case 'yields':
        json = Array.isArray(json.data) ? json.data.slice(0,500) : []
        break
      case 'dex':
      case 'fees':
        json = Array.isArray(json.protocols) ? json.protocols.slice(0,500) : []
        break
    }

    return (Array.isArray(json) ? json : [json]).map(item => {
      const out = {}
      for (const [k,v] of Object.entries(item)) {
        if (v === null || typeof v !== 'object') out[k] = v
      }
      return out
    })
  } catch (err) {
    return errorMessageHandler(err, 'DEFILLAMA')
  }
}

export async function UNISWAP() {
  try {
    const [graphType, category, param1, param2] = utils.argsToArray(arguments)

    validateParams(uniswapParamsSchema, { graphType, category, param1, param2 })

    const baseUrl = 'https://onchain-proxy.fileverse.io/third-party'
    const url =
      `${baseUrl}` +
      `?service=uniswap` +
      `&graphType=${graphType}` +
      `&category=${category}` +
      `&input1=${encodeURIComponent(param1)}` +
      (param2 ? `&input2=${encodeURIComponent(param2)}` : '')

    // fetch data
    const res = await fetch(url)
    if (!res.ok) {
      throw new NetworkError('UNISWAP', res.status)
    }

    const json = await res.json()
    if (Array.isArray(json)) {
      // flatten nested
      return json.map(item => {
        const flat = {}
        Object.entries(item).forEach(([k,v]) => {
          if (v === null || typeof v !== 'object') flat[k] = v
        })
        return flat
      })
    }
    return json
  } catch (err) {
    return errorMessageHandler(err, 'UNISWAP')
  }
}


export async function AAVE() {
  try {

    const [graphType, category, param1, param2] = utils.argsToArray(arguments)


    validateParams(aaveParamsSchema, { graphType, category, param1, param2 })

    const baseUrl = 'https://onchain-proxy.fileverse.io/third-party'
    const url =
      `${baseUrl}` +
      `?service=aave` +
      `&graphType=${encodeURIComponent(graphType)}` +
      `&category=${encodeURIComponent(category)}` +
      `&input1=${encodeURIComponent(param1)}` +
      (param2 ? `&input2=${encodeURIComponent(param2)}` : '')

    const res = await fetch(url)
    if (!res.ok) {
      throw new NetworkError('AAVE', res.status)
    }

    const json = await res.json()
    if (Array.isArray(json)) {
      return json.map(item => {
        const flat = {}
        Object.entries(item).forEach(([k, v]) => {
          if (v === null || typeof v !== 'object') flat[k] = v
        })
        return flat
      })
    }
    return json
  } catch (err) {
    return errorMessageHandler(err, 'AAVE')
  }
}

export function POLYMARKET() {
  return 'Coming Soon'
}

export function PRIVACYPOOL() {
  return 'Coming Soon'
}

export function ROTKI() {
  return 'Coming Soon'
}

export function MEERKAT() {
  return 'Coming Soon'
}

export function ARTEMIS() {
  return 'Coming Soon'
}

export function TALLY() {
  return 'Coming Soon'
}

export function MYANIMELIST() {
  return 'Coming Soon'
}