import {fromTimeStampToBlock} from './from-timestamp-to-block'
import {CHAIN_ID_MAP, ERROR_MESSAGES_FLAG, MAX_PAGE_LIMIT} from './constants'
import {SERVICE_API_KEY} from '../crypto-constants'
import {toTimestamp} from './toTimestamp'
import { isAddress } from './is-address';
import { fromEnsNameToAddress } from './from-ens-name-to-address';



export async function handleScanRequest({
  scanKey,
  baseUrl,
  type,
  chain,
  address,
  startDate,
  endDate,
  page = 1,
  offset = 10,
}) {
  const API_KEY = window.localStorage.getItem(scanKey);
  if (!API_KEY) return `${scanKey}${ERROR_MESSAGES_FLAG.MISSING_KEY}`;
  if (API_KEY === 'xxxx') return `${scanKey}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`;
  if(offset > MAX_PAGE_LIMIT){
    return ERROR_MESSAGES_FLAG.MAX_PAGE_LIMIT
  }

  let chainId = CHAIN_ID_MAP[chain?.toLowerCase()];
  if (!chainId) return `${scanKey}${ERROR_MESSAGES_FLAG.INVALID_CHAIN}`;

  if(!isAddress(address)){
    address = await fromEnsNameToAddress(address)
  }

  if(!address){
    return `${address}${ERROR_MESSAGES_FLAG.INVALID_PARAM}`
  }

  const ACTION_MAP = {
    'all-txns': 'txlist',
    'token-txns': 'tokentx',
    'nft-txns': 'tokennfttx',
    'gas': 'gastracker',
  };

  const action = ACTION_MAP[type];
  if (!action) return `${scanKey}${ERROR_MESSAGES_FLAG.INVALID_TYPE}`;


  if (scanKey === SERVICE_API_KEY.Basescan) chainId = 'base';
if (scanKey === SERVICE_API_KEY.Gnosisscan) chainId = 'gnosis';

  let url = `${baseUrl}?chainid=${chainId}&module=account&action=${action}&apikey=${API_KEY}`;

  if (['all-txns', 'token-txns', 'nft-txns'].includes(type)) {
    if (!address) return `${scanKey}${ERROR_MESSAGES_FLAG.INVALID_ADDRESS}`;
    url += `&address=${address}&startblock=0&endblock=99999999&sort=asc`;

    if (!isNaN(startDate) && !isNaN(endDate)) {
      const [startBlock, endBlock] = await Promise.all([
        fromTimeStampToBlock(toTimestamp(startDate), chain, API_KEY),
        fromTimeStampToBlock(toTimestamp(endDate), chain, API_KEY),
      ]);
      url += `&startblock=${startBlock}&endblock=${endBlock}`;
    }
    url += `&page=${page}&offset=${offset}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const json = await res.json();

    if (typeof json.result === 'string') {
      if (json.result.includes('Invalid API Key')) return `${scanKey}${ERROR_MESSAGES_FLAG.INVALID_API_KEY}`;
      if (json.result.includes('Max rate limit reached')) return `${scanKey}${ERROR_MESSAGES_FLAG.RATE_LIMIT}`;
    }

    return json.result;
  } catch (err) {
    console.error(`[${scanKey}]`, err);
    return ERROR_MESSAGES_FLAG.DEFAULT;
  }
}

