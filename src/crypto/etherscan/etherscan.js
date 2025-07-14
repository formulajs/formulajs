/* global window */

import { SERVICES_API_KEY, CHAIN_ID_MAP } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { ValidationError } from '../../utils/error-instances.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import { handleScanRequest } from '../../utils/handle-explorer-request.js'
import {etherscanParamsSchema} from './etherscan-schema.js'





export async function ETHERSCAN() {
  try {
    const [type, chain, address, startDate, endDate, page = 1, limit = 10] =
      utils.argsToArray(arguments)


    validateParams(etherscanParamsSchema, { type, chain, address, startDate, endDate, page, limit })

    const chainId = CHAIN_ID_MAP[chain]
    if (!chainId) throw new ValidationError(`Invalid chain: ${chain}`)

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Etherscan)

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