const serialize = require("./serialize");
const genID = require("../../utils/genID");
const { itemKey } = require("../../keys");
const { redisManager } = require("../../redis/client");
const deserialize = require("./deserialize");

const getItem = async (id) => {
  const item = await redisManager.client.hGetAll(itemKey(id));

  if (Object.keys(item).length === 0) {
    return null;
  }

  return deserialize(id, item);
};

const getItems = async (ids) => {
  const commands = ids.map((id) => {
    return redisManager.client.hGetAll(itemKey(id));
  });

  const results = await Promise.all(commands);
  return results.map((result, i) => {
    if (Object.keys(result).length === 0) {
      return null;
    }

    return deserialize(ids[i], result);
  });
};

// data : {name, imageUrl, description, createdAt, endingAt, ownerId, highestBidUserId, status, price, views, likes, bids}
const createItem = async (data) => {
  const id = genID();

  const serialized = serialize(data);

  await redisManager.client.hSet(itemKey(id), serialized);

  return id;
};

module.exports = { getItem, getItems, createItem };
