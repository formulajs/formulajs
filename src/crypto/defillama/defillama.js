import { errorMessageHandler, validateParams } from "../../utils/error-messages-handler.js"
import {CATEGORY_URLS, defillamaParamsSchema} from './defillama-schema.js'
import * as utils from '../../utils/common.js'
import { SERVICES_API_KEY } from "../../utils/constants.js"
import { NetworkError, ValidationError } from "../../utils/error-instances.js"

export async function DEFILLAMA() {
  try {
    const [category] = utils.argsToArray(arguments)
    validateParams(defillamaParamsSchema, { category })
    const url = CATEGORY_URLS[category]
    if (!url) throw new ValidationError(`Invalid category: ${category}`)
    const res = await fetch(url)
    if (!res.ok) throw new NetworkError(SERVICES_API_KEY.Defillama, res.status)
    let json = await res.json()

    switch (category) {
      case 'protocols':
        json = Array.isArray(json) ? json.slice(0, 500) : []
        break
      case 'yields':
        json = Array.isArray(json.data) ? json.data.slice(0, 500) : []
        break
      case 'dex':
      case 'fees':
        json = Array.isArray(json.protocols) ? json.protocols.slice(0, 500) : []
        break
    }

    return (Array.isArray(json) ? json : [json]).map(item => {
      const out = {}
      for (const [k, v] of Object.entries(item)) {
        if (v === null || typeof v !== 'object') out[k] = v
      }
      return out
    })
  } catch (err) {
    return errorMessageHandler(err, 'DEFILLAMA')
  }
}