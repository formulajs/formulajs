/* global window */


import { SERVICES_API_KEY, CHAIN_ID_MAP } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import { handleScanRequest } from '../../utils/handle-explorer-request.js'
import {gnosisParamsSchema} from './gnosis.schema.js'





export async function GNOSIS() {
  try {
    const [type, address, startDate, endDate, page = 1, limit = 10] =
      utils.argsToArray(arguments)

    // same validation rules as BASE
    validateParams(gnosisParamsSchema, {
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