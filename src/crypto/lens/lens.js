/* global window */




import { SERVICES_API_KEY } from '../../utils/constants.js'
import * as utils from '../../utils/common.js'
import { NetworkError } from '../../utils/error-instances.js'
import { errorMessageHandler, validateParams } from '../../utils/error-messages-handler.js'
import { getUrlAndHeaders } from '../../utils/proxy-url-map.js'
import {lensParamsSchema} from './lens-schema.js'




export async function LENS() {
  try {
    const [contentType, identifier, start = 0, end = 10] =
      utils.argsToArray(arguments)

    validateParams(lensParamsSchema, {
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
        .map((s) => s.trim())
        .filter(Boolean)
        .join(',')
    )
    const typeMap = {
      posts: 'lensid',
      replies: 'lenspostid',
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
      throw new NetworkError(SERVICES_API_KEY.Firefly, response.status)
    }

    const { data } = await response.json()
    if (!Array.isArray(data)) return []

    return data.map((item) => {
      const flat = {}
      for (const [key, value] of Object.entries(item)) {
        if (value == null || typeof value !== 'object') {
          flat[key] = value
        }
      }
      flat.platform = 'lens'
      return flat
    })
  } catch (err) {
    return errorMessageHandler(err, 'LENS')
  }
}
