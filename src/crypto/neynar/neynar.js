/* global window */



import { SERVICES_API_KEY } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import {neynarParamsSchema} from './neynar.schema.js'
import * as fromUsernameToFidUtil from '../../utils/from-username-to-fid.js'
import { NetworkError, ValidationError } from '../../utils/error-instances.js'
import { getUrlAndHeaders } from '../../utils/proxy-url-map.js'






export async function NEYNAR() {
  try {


    const [username] = utils.argsToArray(arguments)

    validateParams(neynarParamsSchema, { username })

    const apiKey = window.localStorage.getItem(SERVICES_API_KEY.Neynar)

    const fid = await fromUsernameToFidUtil.default.fromUsernameToFid(username, apiKey)
    if (!fid) throw new ValidationError(`Invalid username: ${username}`)

    const url = `https://api.neynar.com/v2/farcaster/followers?fid=${fid}`

    const { URL: finalUrl, HEADERS } = getUrlAndHeaders({
      url: url.toString(), serviceName: 'Neynar',
        headers: {
          'x-api-key': apiKey,
          'x-neynar-experimental': 'false'
        }
      
    });

    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: HEADERS,
    })
    if (!response.ok) {
      throw new NetworkError(SERVICES_API_KEY.Neynar, response.status)
    }

    const json = await response.json()
    const users = json?.users || []
    if (!users.length) return []

    return users.map(({ user }) => ({
      username: user.username,
      custody_address: user.custody_address,
      follower_count: user.follower_count,
      country: user.profile?.location?.address?.country || '',
      city: user.profile?.location?.address?.city || '',
    }))
  } catch (err) {
    return errorMessageHandler(err, 'NEYNAR')
  }
}