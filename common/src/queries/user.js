const { userKey } = require("../keys.js");
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

  await redisManager.client.hSet(userKey(id), serialize(data));

  return id;
};

module.exports = { getUserByUsername, getUserById, createUser };
