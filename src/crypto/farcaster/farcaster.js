/* global window */

import { errorMessageHandler, validateParams } from "../../utils/error-messages-handler.js"
import {farcasterParamsSchema} from './farcaster-schema.js'
import * as utils from '../../utils/common.js'
import { SERVICES_API_KEY } from "../../utils/constants.js"
import { getUrlAndHeaders } from "../../utils/proxy-url-map.js"
import { NetworkError } from "../../utils/error-instances.js"







export async function FARCASTER() {
  try {
    const [contentType, identifier, start = 0, end = 10] =
      utils.argsToArray(arguments)
    validateParams(farcasterParamsSchema, {
      contentType,
      identifier,
      start,
      end,
    })

    const apiKey = window.localStorage.getItem(
      SERVICES_API_KEY.Firefly
    )

    const url = new URL(
      'https://openapi.firefly.land/v1/fileverse/fetch'
    )
    url.searchParams.set(
      'query',
      identifier
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .join(',')
    )
    const typeMap = {
      posts: 'farcasterid',
      replies: 'farcasterpostid',
      channels: 'farcasterchannels',
    }
    url.searchParams.set('type', typeMap[contentType])
    url.searchParams.set('start', String(start))
    url.searchParams.set('end', String(end))

    const { URL: finalUrl, HEADERS } = getUrlAndHeaders({ url: url.toString(), serviceName: 'Firefly', headers: { 'x-api-key': apiKey } });

    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: HEADERS,
    })
    if (!response.ok) {
      throw new NetworkError(
        SERVICES_API_KEY.Firefly,
        response.status
      )
    }

    const { data } = await response.json()
    if (!Array.isArray(data)) return []

    return data.map(item => {
      const flat = {}
      for (const [k, v] of Object.entries(item)) {
        if (v == null || typeof v !== 'object') {
          flat[k] = v
        }
      }
      flat.platform = 'farcaster'
      return flat
    })
  } catch (err) {
    return errorMessageHandler(err, 'FARCASTER')
  }
}