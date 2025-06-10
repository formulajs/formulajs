  import {CHAIN_API_BASE} from './constants'
  
  export const fromTimeStampToBlock = async (timestamp, chain, apiKey) => {
          const baseUrl = CHAIN_API_BASE[chain];
          if(!baseUrl){
            throw new Error('Unsupported Chain')
          }
    try {
      const url = `${baseUrl}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`;
      const res = await fetch(url);
      const json = await res.json();
      return parseInt(json.result);
    } catch {
      return 0;
    }
  };