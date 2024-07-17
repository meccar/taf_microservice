const { userKey, usernamesUniqueKey } = require("../keys.js");
const genID = require("../utils/genID.js");
const serialize = require("./items/serialize.js");
const deserialize = require("./items/deserialize.js");
const { redisManager } = require("../redis/client");

const getUserByUsername = async (username) => {};

const getUserById = async (id) => {
  const user = await redisManager.client.hGetAll(userKey(id));

  return deserialize(id, user);
};

// data = {username, password}
const createUser = async (data) => {
  const id = genID();

  // check if username already existed
  const exists = await redisManager.client.sIsMember(
    usernamesUniqueKey(),
    data.username
  );

  if (exists) {
    throw new Error("Username is taken");
  }

  await redisManager.client.hSet(userKey(id), serialize(data));
  await redisManager.client.sAdd(usernamesUniqueKey(), data.username);

  return id;
};

module.exports = { getUserByUsername, getUserById, createUser };
