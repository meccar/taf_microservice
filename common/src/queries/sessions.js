const sessionKey = require("../keys");
const serialize = require("./items/serialize.js");
const deserialize = require("./items/deserialize.js");
const { redisManager } = require("../redis/client");

const getSession = async (id) => {
  const session = await redisManager.client.hGetAll(sessionKey(id));

  if (Object.keys(session).length === 0) {
    return null;
  }

  return deserialize(id, session);
};

// data: {id, userID, username}
const saveSession = async (data) => {
  return redisManager.client.hSet(sessionKey(data.id), serialize(data));
};

module.exports = { getSession, saveSession };
