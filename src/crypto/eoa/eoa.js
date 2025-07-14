/* global window */

import { CHAIN_ID_MAP, SERVICES_API_KEY } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import {eoaParamsSchema} from './eoa-schema.js'
import * as isAddressUtil from '../../utils/is-address.js'
import * as fromEnsNameToAddressUtil from '../../utils/from-ens-name-to-address.js'
import { getUrlAndHeaders } from '../../utils/proxy-url-map.js'
import { InvalidApiKeyError, NetworkError, RateLimitError, ValidationError } from '../../utils/error-instances.js'
import * as fromTimeStampToBlockUtil from '../../utils/from-timestamp-to-block.js'
import { toTimestamp } from '../../utils/toTimestamp.js'


export async function EOA() {
  try {
    const [addresses, category, chains, startTime, endTime, page = 1, offset = 10] =
      utils.argsToArray(arguments)
    validateParams(eoaParamsSchema, { addresses, category, chains, startTime, endTime, page, offset })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Etherscan)

    const INPUTS = addresses.split(',').map(s => s.trim()).filter(Boolean)
    const CHAINS = chains.split(',').map(s => s.trim()).filter(Boolean)

    const ADDRESS_MAP = {}
    for (const inp of INPUTS) {
      if (isAddressUtil.default.isAddress(inp)) {
        ADDRESS_MAP[inp.toLowerCase()] = null
      } else {
      const _address = await fromEnsNameToAddressUtil.default.validateAndGetAddress(inp)
        ADDRESS_MAP[_address.toLowerCase()] = _address
      }
    }
    const ADDRS = Object.keys(ADDRESS_MAP)
    const out = []

    async function fetchJSON(url) {
      const { URL: finalUrl, HEADERS } = getUrlAndHeaders({ url, serviceName: 'Etherscan', headers: {} });
      const res = await fetch(finalUrl, {
        method: 'GET',
        headers: HEADERS,
      })
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
        for (let i = 0; i < ADDRS.length; i += 20) {
          const slice = ADDRS.slice(i, i + 20).join(',')
          const url =
            `https://api.etherscan.io/v2/api?chainid=${chainId}` +
            `&module=account&action=addresstokenbalance&address=${slice}` +
            `&page=${page}&offset=${offset}&apikey=${apiKey}`
          const data = await fetchJSON(url)
          if (!Array.isArray(data)) return data
          data.forEach((item, idx) => out.push({ chain, address: ADDRS[i + idx], name: ADDRESS_MAP[ADDRS[i + idx]], ...item }))
        }
      } else {
        // txns
        const sb = await fromTimeStampToBlockUtil.default.fromTimeStampToBlock(toTimestamp(startTime), chain, apiKey)
        const eb = await fromTimeStampToBlockUtil.default.fromTimeStampToBlock(toTimestamp(endTime), chain, apiKey)
        if (!sb) throw new ValidationError(`Invalid startTime: ${startTime}`)
        if (!eb) throw new ValidationError(`Invalid endTime: ${endTime}`)
        for (const addr of ADDRS) {
          const url =
            `https://api.etherscan.io/v2/api?chainid=${chainId}` +
            `&module=account&action=tokentx&address=${addr}` +
            `&startblock=${sb}&endblock=${eb}` +
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