import { SERVICES_API_KEY } from "../../utils/constants.js";

export const FIREFLY_metadata =   {
    API_KEY: SERVICES_API_KEY.Firefly,
    LOGO: 'https://firefly.social/android-chrome-192x192.png',
    BRAND_COLOR: '#f8f5fc',
    BRAND_SECONDARY_COLOR: '#855dcd',
    n: 'FIREFLY',
    t: 20,
    d: 'Fetches content from Farcaster or Lens.',
    a: 'Retrieves posts, replies, or channels from Farcaster and Lens by usernames, IDs, or hashes.',
    p: [
      {
        name: 'platform',
        detail: "The social platform to query. Supports 'farcaster' or 'lens'.",
        example: `"farcaster"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'contentType',
        detail:
          "Type of content to fetch. Supports 'posts', 'replies', and 'channels' (channels only for 'farcaster').",
        example: `"posts"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'identifier',
        detail: 'Comma-separated usernames, IDs, or post hashes depending on platform and contentType.',
        example: `"toka,miroyato"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'start',
        detail: 'Pagination start index (default is 0).',
        example: `0`,
        require: 'o',
        type: 'number'
      },
      {
        name: 'end',
        detail: 'Pagination end index (default is 10).',
        example: `10`,
        require: 'o',
        type: 'number'
      }
    ]
  }