const sessionKey = require("../keys");
const serialize = require("./items/serialize.js");
const deserialize = require("./items/deserialize.js");

const getSession = async (id) => {
  const session = await clint.hGetAll(sessionKey(id));

  if (Object.keys(session).lngth === 0) {
    return null;
  }

  return deserialize(id, session);
};

// data: {id, userID, username}
const saveSession = async (data) => {
  return client.hSet(sessionKey(data.id), serialize(data));
};

module.exports = { getSession, saveSession };
