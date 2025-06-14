import { sha3_256 } from "js-sha3";

export async function toEnsName(address) {
  const reverseName = address.toLowerCase().replace(/^0x/, "") + ".addr.reverse";
  const node = namehash(reverseName);
  const endpoint = "https://cloudflare-eth.com";

  // Step 1: Get resolver address from ENS registry
  const resolverRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [
        {
          to: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          data: "0x0178b8bf" + node.slice(2).padStart(64, "0")
        },
        "latest"
      ]
    })
  });

  const { result: resolverHex } = await resolverRes.json();
  const resolverAddress = "0x" + resolverHex.slice(-40);
  if (!/^0x[0-9a-f]{40}$/i.test(resolverAddress)) return null;

  // Step 2: Call resolver.name(node)
  const nameRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "eth_call",
      params: [
        {
          to: resolverAddress,
          data: "0x691f3431" + node.slice(2)
        },
        "latest"
      ]
    })
  });

  const { result: nameHex } = await nameRes.json();
  if (!nameHex || nameHex === "0x") return null;

  // Decode hex ENS name
  const hex = nameHex.slice(2);
  let name = "";
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.slice(i, i + 2), 16);
    if (code === 0) break;
    name += String.fromCharCode(code);
  }

  return name || null;
}

// ENS Namehash using js-sha3
function namehash(name) {
  let node = "0000000000000000000000000000000000000000000000000000000000000000";
  if (name) {
    const labels = name.toLowerCase().split(".");
    for (let i = labels.length - 1; i >= 0; i--) {
      const labelSha = sha3_256.array(labels[i]);
      const combined = node + bytesToHex(labelSha);
      node = sha3_256.array(hexToBytes(combined));
      node = bytesToHex(node);
    }
  }
  return "0x" + node;
}

// Helpers
function hexToBytes(hex) {
  hex = hex.replace(/^0x/, "");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}
