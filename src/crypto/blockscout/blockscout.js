import { errorMessageHandler, validateParams } from "../../utils/error-messages-handler.js"
import {blockscoutParamsSchema} from './blockscout-schema.js'
import * as utils from '../../utils/common.js'
import * as fromEnsNameToAddressUtil from '../../utils/from-ens-name-to-address.js'
import { BLOCKSCOUT_CHAINS_MAP } from "../../utils/constants.js"
import { NetworkError, ValidationError } from "../../utils/error-instances.js"

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

    const resolvedAddress = await fromEnsNameToAddressUtil.default.validateAndGetAddress(address)

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