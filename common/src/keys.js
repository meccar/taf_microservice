const pageCacheKey = (id) => `pageCache#${id}`;

const userKey = (userID) => `user#${userID}`;

const sessionKey = (sessionID) => `session#${sessionID}`;

module.exports = { pageCacheKey, userKey, sessionKey };
