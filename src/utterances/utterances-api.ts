export const UTTERANCES_API =
  process.env.NODE_ENV === 'production'
    ? 'https://comment.hayes.software'
    : 'http://localhost:1243'
