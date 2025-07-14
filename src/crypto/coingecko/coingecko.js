/* global window */



import { SERVICES_API_KEY } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { InvalidApiKeyError, NetworkError } from '../../utils/error-instances.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import { getUrlAndHeaders } from '../../utils/proxy-url-map.js'
import {coingeckoParamsSchema} from './coingecko-schema.js'


export async function COINGECKO() {
  try {
    const [category, param1, param2] = utils.argsToArray(arguments)
    validateParams(coingeckoParamsSchema, { category, param1, param2 })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Coingecko)

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
        const map = { all: '', base: 'base-ecosystem', meme: 'meme-token', aiagents: 'ai-agents', bitcoin: 'bitcoin-ecosystem', ethereum: 'ethereum-ecosystem', hyperliquid: 'hyperliquid-ecosystem', pump: 'pump-ecosystem', solana: 'solana-ecosystem' }
        const _category = map[param1] || ''
        const trend = param2 ? `&price_change_percentage=${param2}` : ''
        url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&include_tokens=top&page=1&per_page=100${_category ? `&category=${_category}` : ''}${trend}`
        break
      }
      case 'stablecoins': {
        const _category = param1 === 'all' ? 'stablecoins' : param1
        const trend = param2 ? `&price_change_percentage=${param2}` : ''
        url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${_category}&order=market_cap_desc&page=1&per_page=100${trend}`
        break
      }
      case 'derivatives': {
        url = (!param1 || param1 === 'all')
          ? 'https://api.coingecko.com/api/v3/derivatives'
          : `https://api.coingecko.com/api/v3/derivatives/exchanges/${param1}?include_tickers=all`
        break
      }
    }
    const {URL: finalUrl, HEADERS} = getUrlAndHeaders({url, serviceName: 'Coingecko', headers})

    const res = await fetch(finalUrl, { headers: HEADERS })
    const json = await res.json()
    if (!res.ok) {
      const msg = json?.status?.error_message || ''
      if (msg.includes('API Key Missing')) throw new InvalidApiKeyError(SERVICES_API_KEY.Coingecko)
      throw new NetworkError(SERVICES_API_KEY.Coingecko, res.status)
    }

    if (category === 'price') {
      const out = {}
      for (const [token, prices] of Object.entries(json))
        for (const [cur, val] of Object.entries(prices))
          out[`${token.charAt(0).toUpperCase() + token.slice(1)}_${cur.toUpperCase()}`] = val
      return [out]
    }

    const data = Array.isArray(json) ? json : [json]
    return data.map(item => {
      const flat = {}
      for (const [key, value] of Object.entries(item)) {
        if (typeof value !== 'object' || value === null) {
          flat[key] = value
        }
      }
      return flat
    })
  } catch (err) {
    return errorMessageHandler(err, 'COINGECKO')
  }
}