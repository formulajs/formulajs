import { SERVICES_API_KEY } from "../../utils/constants.js";

export const LENS_metadata = {
    API_KEY: SERVICES_API_KEY.Firefly,
    LOGO: 'https://tse3.mm.bing.net/th?id=OIP.1TANdvYNcEadCk6CO1bCcgAAAA&r=0&w=440&h=440&c=7',
    SECONDARY_LOGO: 'https://firefly.social/android-chrome-192x192.png',
    BRAND_COLOR: '#f8f5fc',
    BRAND_SECONDARY_COLOR: '#855dcd',
    n: 'LENS',
    t: 20,
    d: 'Fetches content from Lens.',
    a: 'Retrieves posts or replies from Lens by usernames, IDs, or hashes.',
    p: [
      {
        name: 'contentType',
        detail: "Type of content to fetch. Supports 'posts' or 'replies'.",
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