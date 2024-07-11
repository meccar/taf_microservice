const client = require("$service/redis");
const pageCacheKey = require("../keys");
// const cacheRoutes = [];

const getCachedPage = (cacheRoutes, route) => {
  if (cacheRoutes.includes(route)) {
    return client.get(pageCacheKey(route));
  }
  return null;
};

const setCachedPage = (cacheRoutes, route, page) => {
  if (cacheRoutes.includes(route)) {
    return client.set(pageCacheKey(route), page, {
      EX: 2,
    });
  }
};

module.exports = { getCachedPage, setCachedPage };
