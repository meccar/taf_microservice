const redis = require("redis");
const RedisStore = require("connect-redis").default;

class RedisManager {
  constructor() {
    this._client = undefined;
    this.redisStore = undefined;
  }

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Redis client before connecting");
    }
    return this._client;
  }

  connect(config) {
    this._client = redis.createClient(config);

    return new Promise((resolve, reject) => {
      this.client.connect().then(() => {
        console.log(`Connected to Redis!`);

        this.redisStore = new RedisStore({
          client: this.client,
          prefix: "taf",
        });

        this.getAsync = promisify(this._client.get).bind(this._client);
        this.setAsync = promisify(this._client.set).bind(this._client);

        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }

  async get(key) {
    return this.getAsync(key);
  }

  async set(key, value, minTTL = 3600, maxTTL = 7200) {
    const ttl = Math.floor(Math.random() * (maxTTL - minTTL + 1) + minTTL);
    return this.setAsync(key, value, 'EX', ttl);
  }

  // Transaction handling
  async runTransaction(commands) {
    const multi = this._client.multi();
    commands.forEach((cmd) => multi[cmd.method](cmd.args));
    return await multi.exec();
  }

  // Lua scripting
  async runLuaScript(script, keys, args) {
    return await this._client.eval(script, {
      keys: keys,
      arguments: args,
    });
  }

  // Pub/Sub
  async subscribe(channel, callback) {
    return await this._client.subscribe(channel, (message) => {
      callback(message);
    });
  }

  async publish(channel, message) {
    return await this._client.publish(channel, message);
  }

  // Streams
  async addToStream(streamName, fields) {
    return await this._client.xAdd(streamName, "*", fields);
  }

  async readFromStream(streamName, id = "0-0") {
    return await this._client.xRead({
      key: streamName,
      id: id,
    });
  }

  // Caching
  async cacheWithExpiry(key, value, minTTL = 3600, maxTTL = 7200) {
    const ttl = Math.floor(Math.random() * (maxTTL - minTTL + 1) + minTTL);
    return await this._client.set(key, value, {
      EX: ttl,
    });
  }

  // Pipelining
  async runPipeline(commands) {
    const pipeline = this._client.multi();
    commands.forEach((cmd) => pipeline[cmd.method](cmd.args));
    return await pipeline.exec();
  }

  // Geo-spatial operations
  async addGeoLocation(key, longitude, latitude, member) {
    return await this._client.geoAdd(key, { longitude, latitude, member });
  }

  async getGeoDistance(key, member1, member2, unit = "km") {
    return await this._client.geoDist(key, member1, member2, unit);
  }

  // Rate limiting
  async checkRateLimit(key, limit, windowInSeconds) {
    const multi = this._client.multi();
    multi.incr(key);
    multi.expire(key, windowInSeconds);
    const results = await multi.exec();
    const count = results[0];
    return count <= limit;
  }

  // Sorted Set operations
  async addToSortedSet(key, score, member) {
    return await this._client.zAdd(key, { score, value: member });
  }

  async getRankInSortedSet(key, member) {
    return await this._client.zRank(key, member);
  }

  // List operations
  async pushToList(key, ...values) {
    return await this._client.rPush(key, values);
  }

  async getListRange(key, start, stop) {
    return await this._client.lRange(key, start, stop);
  }

  // Hash operations
  async setHashField(key, field, value) {
    return await this._client.hSet(key, field, value);
  }

  async getHashField(key, field) {
    return await this._client.hGet(key, field);
  }

  // Close connection
  async quit() {
    await this._client.quit();
  }

  async getRedisStore() {
    if (!this.redisStore) {
      throw new Error("Redis store not initialized");
    }
    return this.redisStore;
  }
}

const redisManager = new RedisManager();
module.exports = { redisManager };
