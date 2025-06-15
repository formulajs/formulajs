import {UTILITY} from './constants'


export async function fromEnsNameToAddress(name) {
  if (typeof ethers === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/ethers@6.10.0/dist/ethers.umd.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  const ALCHEMY_KEY = window.localStorage.getItem(UTILITY.ALCHEMY_API_KEY);
  if(!ALCHEMY_KEY){
    console.error("alchemy api key missing")
    return null
  }
  const provider = new ethers.AlchemyProvider("mainnet", ALCHEMY_KEY);

  try {
    const resolved = await provider.resolveName(name); // ENS ➝ address
    return resolved || null;
  } catch (err) {
    console.error("ENS resolution failed:", err.message);
    return null;
  }
}