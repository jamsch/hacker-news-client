// Node.js polyfill for fetch
require("cross-fetch/polyfill");

/* eslint-env node */
module.exports =
  process.env.NODE_ENV === "production"
    ? require("./umd/hacker-news-client.production.min.js")
    : require("./umd/hacker-news-client.development.js");
