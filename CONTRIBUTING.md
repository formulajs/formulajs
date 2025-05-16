# FormulaJS – Fileverse Data Block Powerhouse
Welcome to the collection of data blocks for dSheet.new — your on-chain, privacy-first alternative to G**gle D*cs. dSheet.new is peer-to-peer, end-to-end encrypted, and fully decentralized. Give it a try!

Adding a New Data Block
Follow these steps to add a new data block for use in dSheet.new:

- All data block functions related to crypto must be added to src/crypto.js.

- For example, let's look at a simple data block already present in src/crypto.js:
```
export async function GETTXLIST(address, page, offset) {
    const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Etherscan);
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${API_KEY}`
  
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const json = await response.json()
      if(json.result.includes("Invalid API Key")){
        return `${SERVICE_API_KEY.Etherscan}_MISSING`
      }
      return json.result;
    } catch (error) {
      return "ERROR IN FETCHING"
    }
  }
```
Below is a breakdown of the above function along with key steps to consider when adding a new data block :-

[1] Define API key name in `src/crypto-constants.js` in case if it is needed.

[2] You can now make the API call and process the data.
- Processed data can be returned  as `array of object` or just as `string`
- In the case of an array of objects, it should follow the structure shown below:

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/data-block-res.png" />

The returned `array of objects` will be processed and displayed in the UI as shown below:

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/data-block-ui.png" />

[3] Coming back to `string` type, in this case single UI cell will be updated.

[4] <b>Handling Missing Default API Key</b>, If the API key is not available, return ${SERVICE_API_KEY.Etherscan}_MISSING. When this value is returned, the package will automatically show an input modal allowing the user to enter and save their API key. Once the key is saved, the function will be triggered again automatically.
Example UI for API Key input:

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/api-data-block.png" />

[5] For rest other error you can just return error string like `ERROR IN FETCHING`.

[6] All done with the data block! The final step is to add metadata to enable detailed suggestions when users search for it. An example is provided below :- 

<img width="4410" alt="github_banner_final@3x" src="https://raw.githubusercontent.com/mritunjayz/test-private/refs/heads/main/suggestion-data-block.png" />
<br></br>
To do this, add a detailed JSON object to the FUNCTION_LOCALE section in src/crypto-constant.js. You can refer to the existing data block entries for guidance.
Note: Make sure to include t: 20, in your JSON object — this field is required.
