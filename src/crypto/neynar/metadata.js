import { SERVICES_API_KEY } from "../../utils/constants.js";

export const Neynar_metadata =   {
    API_KEY: SERVICES_API_KEY.Neynar,
    LOGO: 'https://framerusercontent.com/images/OS5YeZ2Y7DmszAxL6Zf06pXtKzc.svg',
    BRAND_COLOR: '#e8e6ff',
    BRAND_SECONDARY_COLOR: '#28204A',
    n: 'NEYNAR',
    t: 20,
    d: "Fetches followers for a given Farcaster username using Neynar's API.",
    a: 'Retrieves followers of a Farcaster user, with support for sorting, pagination, and optional viewer context.',
    p: [
      {
        name: 'username',
        detail: 'The Farcaster username whose followers should be fetched.',
        example: `"miroyato"`,
        require: 'm',
        type: 'number'
      }
    ]
  }