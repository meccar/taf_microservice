const redis = require("redis");
const connectRedis = require("connect-redis");

class RedisManager {
  constructor() {
    this.client = null;
    this.redisStore = null;
  }

  async connect(config) {
    this.client = redis.createClient(config);
    this.client.on("error", (err) => console.error("Redis Client Error", err));
    await this.client.connect().then(() => console.log(`Connected to Redis!`));

    // Initialize store after client is connected
    this.redisStore = new connectRedis({
      client: this.client,
      prefix: "taf",
    });
  }

  // Transaction handling
  async runTransaction(commands) {
    const multi = this.client.multi();
    commands.forEach((cmd) => multi[cmd.method](cmd.args));
    return await multi.exec();
  }

  // Lua scripting
  async runLuaScript(script, keys, args) {
    return await this.client.eval(script, {
      keys: keys,
      arguments: args,
    });
  }

  // Pub/Sub
  subscribe(channel, callback) {
    this.client.subscribe(channel, (message) => {
      callback(message);
    });
  }

  async publish(channel, message) {
    return await this.client.publish(channel, message);
  }

  // Streams
  async addToStream(streamName, fields) {
    return await this.client.xAdd(streamName, "*", fields);
  }

  async readFromStream(streamName, id = "0-0") {
    return await this.client.xRead({
      key: streamName,
      id: id,
    });
  }

  // Caching
  async cacheWithExpiry(key, value, expiryInSeconds) {
    return await this.client.set(key, value, {
      EX: expiryInSeconds,
    });
  }

  // Pipelining
  async runPipeline(commands) {
    const pipeline = this.client.multi();
    commands.forEach((cmd) => pipeline[cmd.method](cmd.args));
    return await pipeline.exec();
  }

  // Geo-spatial operations
  async addGeoLocation(key, longitude, latitude, member) {
    return await this.client.geoAdd(key, { longitude, latitude, member });
  }

  async getGeoDistance(key, member1, member2, unit = "km") {
    return await this.client.geoDist(key, member1, member2, unit);
  }

  // Rate limiting
  async checkRateLimit(key, limit, windowInSeconds) {
    const multi = this.client.multi();
    multi.incr(key);
    multi.expire(key, windowInSeconds);
    const results = await multi.exec();
    const count = results[0];
    return count <= limit;
  }

  // Sorted Set operations
  async addToSortedSet(key, score, member) {
    return await this.client.zAdd(key, { score, value: member });
  }

  async getRankInSortedSet(key, member) {
    return await this.client.zRank(key, member);
  }

  // List operations
  async pushToList(key, ...values) {
    return await this.client.rPush(key, values);
  }

  async getListRange(key, start, stop) {
    return await this.client.lRange(key, start, stop);
  }

  // Hash operations
  async setHashField(key, field, value) {
    return await this.client.hSet(key, field, value);
  }

  async getHashField(key, field) {
    return await this.client.hGet(key, field);
  }

  // Close connection
  async quit() {
    await this.client.quit();
  }

  getRedisStore() {
    return this.redisStore;
  }
}

module.exports = { RedisManager };
