/* global window */
import { SERVICES_API_KEY, SAFE_CHAIN_MAP } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { NetworkError, ValidationError } from '../../utils/error-instances.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import {safeParamsSchema} from './safe-schema.js'
import * as fromEnsNameToAddressUtil from '../../utils/from-ens-name-to-address.js'
import { getUrlAndHeaders } from '../../utils/proxy-url-map.js'





export async function SAFE() {
  try {
    const [address, utility, chain, limit = 10, offset = 0] = utils.argsToArray(arguments)

    validateParams(safeParamsSchema, { address, utility, chain, limit, offset })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Safe)

    const chainId = SAFE_CHAIN_MAP[chain]
    if (!chainId) throw new ValidationError(`Invalid chain: ${chain}`)


    

    const resolved = await fromEnsNameToAddressUtil.default.validateAndGetAddress(address)


    const url = `https://api.safe.global/tx-service/${chainId}/api/v2/safes/${resolved}/multisig-transactions?limit=${limit}&offset=${offset}`

      const { URL: finalUrl, HEADERS } = getUrlAndHeaders({ url, serviceName: 'Etherscan', headers: { Authorization: `Bearer ${apiKey}` } });
    const res = await fetch(finalUrl, { headers: HEADERS })
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
