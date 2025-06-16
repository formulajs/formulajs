import {SERVICE_API_KEY} from '../crypto-constants'

export const fromUsernameToFid = async (username) => {
  if(!username) return null
  const API_KEY = window.localStorage.getItem(SERVICE_API_KEY.Neynar);
  const url = `https://api.neynar.com/v2/farcaster/user/search/`;
  const res = await fetch(url, {
    query: {
      q: username
    },
    headers: {
      'x-api-key': API_KEY,
      'x-neynar-experimental': 'false'
    }
  });
  const json = await res.json();
  const users = json.result && json.result.users;
  const user = users.find(user => user.username === username);
  return user && user.fid || null;
};