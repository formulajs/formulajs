import * as fromTimeStampToBlockUtil from './from-timestamp-to-block.js'
import { toTimestamp } from './toTimestamp.js'
import * as fromEnsNameToAddressUtil from './from-ens-name-to-address.js'
import { SERVICES_API_KEY } from '../crypto-constants.js'
import { InvalidApiKeyError, NetworkError, RateLimitError, ValidationError } from './error-instances.js'
export async function handleScanRequest({
  type,
  address,
  startDate,
  endDate,
  page = 1,
  offset = 10,
  apiKey,
  functionName,
  chainId,
  network
}) {
  const API_INFO_MAP = {
    BASE: { url: 'https://api.basescan.org/api', apiKeyName: SERVICES_API_KEY.Basescan },
    ETHERSCAN: { url: 'https://api.etherscan.io/v2/api', apiKeyName: SERVICES_API_KEY.Etherscan },
    GNOSIS: { url: 'https://api.gnosisscan.io/api', apiKeyName: SERVICES_API_KEY.Gnosisscan }
  }

  if (type !== 'gas') {
    address = await fromEnsNameToAddressUtil.default.validateAndGetAddress(address)
  }

  const apiInfo = API_INFO_MAP[functionName]
  const baseUrl = apiInfo?.url
    if (!baseUrl) throw new ValidationError(`Api not found for: ${functionName}`)


  const ACTION_MAP = {
    'all-txns': 'txlist',
    'token-txns': 'tokentx',
    'nft-txns': 'tokennfttx',
    'gas': 'gasoracle'
  }

  const action = ACTION_MAP[type]
  if (!action) throw new ValidationError(`Invalid type: ${type}`)

  const module = action === 'gasoracle' ? 'gastracker' : 'account';
  let url = `${baseUrl}?chainid=${chainId}&module=${module}&action=${action}&apikey=${apiKey}`;

  if (['all-txns', 'token-txns', 'nft-txns'].includes(type)) {
    url += `&address=${address}&startblock=0&endblock=99999999&sort=asc`

    if (!isNaN(startDate) && !isNaN(endDate)) {
      const [startBlock, endBlock] = await Promise.all([
        fromTimeStampToBlockUtil.default.fromTimeStampToBlock(toTimestamp(startDate), network, apiKey),
        fromTimeStampToBlockUtil.default.fromTimeStampToBlock(toTimestamp(endDate), network, apiKey)
      ])
      url += `&startblock=${startBlock || '0'}&endblock=${endBlock || '99999999'}`
    }
    url += `&page=${page}&offset=${offset}`
  }
    const res = await fetch(url)
    if (!res.ok) {
      throw new NetworkError(apiInfo.apiKeyName, res.status)
    }
    const json = await res.json()

    if (typeof json.result === 'string') {
      if (json.result.includes('Invalid API Key')){
          throw new InvalidApiKeyError(apiInfo.apiKeyName)   
      }
   
      if (json.result.includes('Max rate limit reached'))
        throw new RateLimitError(apiInfo.apiKeyName)
    }

    return type === 'gas' && !Array.isArray(json.result) ? [json.result] : json.result
}
