 const fromUsernameToFid = async (username, apiKey) => {
  if(!username) return null
  const url = `https://api.neynar.com/v2/farcaster/user/search/?q=${username}&limit=5`;
  const res = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
      'x-neynar-experimental': 'false'
    }
  });
  const json = await res.json();
  const users = json.result ? json.result.users : []
  const user = users.find(user => user.username === username);
  return user && user.fid || null;
};
export default {
  fromUsernameToFid
}