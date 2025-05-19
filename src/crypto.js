import { SERVICE_API_KEY } from "./crypto-constants";

export async function GETTXLIST(address, page, offset) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const json = await response.json()
    if (json.result.includes("Invalid API Key")) {
      return `${SERVICE_API_KEY.Etherscan}_MISSING`
    }
    return json.result;
  } catch (error) {
    return "ERROR IN FETCHING"
  }
}

export async function GETPRICE(token, vs_currencies) {
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Coingecko);
  const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${vs_currencies}&ids=${token}`;

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': `${API_KEY}` },
  };

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const jsonResponse = await response.json()
    /*
    JSON RESPONSE EXAMPLE
      {
        "bitcoin": {
            "usd": 103457,
            "inr": 8854165
        },
        "solana": {
            "usd": 167.56,
            "inr": 14340.55
        }
    }
    */

    // Free Coingecko API does not require API key, not need to handle API key error

    const output = {};
    for (const [coin, prices] of Object.entries(jsonResponse)) {
      for (const [currency, value] of Object.entries(prices)) {
        const key = `${coin.charAt(0).toUpperCase() + coin.slice(1)}_${currency.toUpperCase()}`;
        output[key] = value;
      }
    }
    return [output];
  } catch (error) {
    return "ERROR IN FETCHING"
  }
}