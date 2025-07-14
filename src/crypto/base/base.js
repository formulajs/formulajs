/* global window */

import { errorMessageHandler, validateParams } from "../../utils/error-messages-handler.js"
import * as utils from '../../utils/common.js'
import {baseParamsSchema} from './base-schema.js'
import { handleScanRequest } from "../../utils/handle-explorer-request.js"
import { SERVICES_API_KEY, CHAIN_ID_MAP } from "../../utils/constants.js"

export async function BASE() {
  try {
    const [type, address, startDate, endDate, page, limit] = utils.argsToArray(arguments)
    validateParams(baseParamsSchema, { type, address, startDate, endDate, page, limit })
    const API_KEY = window.localStorage.getItem(SERVICES_API_KEY.Basescan)

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