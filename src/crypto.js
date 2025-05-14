import { SERVICE_API_KEY } from "./crypto-constants";

export async function GETTXLIST(address, page, offset) {
    const API_KEY = window.localStorage.getItem('ETHERSCAN_API_KEY');
    console.log("FORMULA JS API KEY ETHERSCAN NOT FOUND", API_KEY)
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`
  
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const json = await response.json()
      console.log(json.result)
      if(json.result.includes("Invalid API Key")){
        return `${SERVICE_API_KEY.Etherscan}_MISSING`
      }
      return json.result;
    } catch (error) {
      console.error('API call failed:', error)
      return "ERROR IN FETCHING"
    }
  }