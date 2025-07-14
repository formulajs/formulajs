import { errorMessageHandler, validateParams } from "../../utils/error-messages-handler.js"
import * as utils from '../../utils/common.js'
import { aaveParamsSchema } from "./aave-schema.js"
import { NetworkError } from "../../utils/error-instances.js"

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