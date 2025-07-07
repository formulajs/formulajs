import {CHAIN_ID_MAP} from './constants.js'
  
   const fromTimeStampToBlock = async (timestamp, chain, apiKey) => {
if(!timestamp || !chain || !apiKey) return 
      const chainId = CHAIN_ID_MAP[chain];
      const url = `https://api.etherscan.io/v2/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}&chainId=${chainId}`;
      const res = await fetch(url);
      const json = await res.json();
      return parseInt(json.result);

  };

export default {
  fromTimeStampToBlock
}
