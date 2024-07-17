const pageCacheKey = (id) => `pageCache#${id}`;

const userKey = (userID) => `user#${userID}`;

const sessionKey = (sessionID) => `session#${sessionID}`;

const itemKey = (itemID) => `item#${itemID}`;

const usernamesUniqueKey = () => "usernames:unique";

module.exports = {
  pageCacheKey,
  userKey,
  sessionKey,
  itemKey,
  usernamesUniqueKey,
};
