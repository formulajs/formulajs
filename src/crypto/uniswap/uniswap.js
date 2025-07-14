import * as utils from '../../utils/common.js'
import { NetworkError } from '../../utils/error-instances.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import {uniswapParamsSchema} from './uniswap-schema.js'








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
        Object.entries(item).forEach(([k, v]) => {
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