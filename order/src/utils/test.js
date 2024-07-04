const redis = require('redis');

class RedisManager {
  constructor(config = {
    username: 'default',
    password: 'secret',
    socket: {
        host: 'my-redis.cloud.redislabs.com',
        port: 6379,
        tls: true,
        key: readFileSync('./redis_user_private.key'),
        cert: readFileSync('./redis_user.crt'),
        ca: [readFileSync('./redis_ca.pem')]
    }
}) {
    this.client = redis.createClient(config);
    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async connect() {
    await this.client
        .connect()
        .then(() => console.log(`Connected to Redis!`));
  }

  // Transaction handling
  async runTransaction(commands) {
    const multi = this.client.multi();
    commands.forEach(cmd => multi[cmd.method](cmd.args));
    return await multi.exec();
  }

  // Lua scripting
  async runLuaScript(script, keys, args) {
    return await this.client.eval(script, {
      keys: keys,
      arguments: args
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
    return await this.client.xAdd(streamName, '*', fields);
  }

  async readFromStream(streamName, id = '0-0') {
    return await this.client.xRead({
      key: streamName,
      id: id
    });
  }

  // Caching
  async cacheWithExpiry(key, value, expiryInSeconds) {
    return await this.client.set(key, value, {
      EX: expiryInSeconds
    });
  }

  // Pipelining
  async runPipeline(commands) {
    const pipeline = this.client.multi();
    commands.forEach(cmd => pipeline[cmd.method](cmd.args));
    return await pipeline.exec();
  }

  // Geo-spatial operations
  async addGeoLocation(key, longitude, latitude, member) {
    return await this.client.geoAdd(key, { longitude, latitude, member });
  }

  async getGeoDistance(key, member1, member2, unit = 'km') {
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
}

// Usage example
async function main() {
  const redisManager = new RedisManager();

  try {
    await redisManager.connect();

    // Transaction example
    const transactionResult = await redisManager.runTransaction([
      { method: 'set', args: ['key1', 'value1'] },
      { method: 'incr', args: ['counter'] }
    ]);
    console.log('Transaction result:', transactionResult);

    // Lua script example
    const luaResult = await redisManager.runLuaScript(
      'return redis.call("SET", KEYS[1], ARGV[1])',
      ['mykey'],
      ['myvalue']
    );
    console.log('Lua script result:', luaResult);

    // Pub/Sub example
    redisManager.subscribe('mychannel', (message) => {
      console.log('Received message:', message);
    });
    await redisManager.publish('mychannel', 'Hello, Redis!');

    // Stream example
    const streamId = await redisManager.addToStream('mystream', { field1: 'value1', field2: 'value2' });
    console.log('Added to stream, ID:', streamId);
    const streamData = await redisManager.readFromStream('mystream');
    console.log('Stream data:', streamData);

    // Caching example
    await redisManager.cacheWithExpiry('cachedKey', 'cachedValue', 60);
    
    // Geo-spatial example
    await redisManager.addGeoLocation('locations', -122.27, 37.80, 'San Francisco');
    await redisManager.addGeoLocation('locations', -74.01, 40.71, 'New York');
    const distance = await redisManager.getGeoDistance('locations', 'San Francisco', 'New York');
    console.log('Distance between SF and NY:', distance, 'km');

    // Rate limiting example
    const canProceed = await redisManager.checkRateLimit('ratelimit:user123', 10, 60);
    console.log('Rate limit check:', canProceed ? 'allowed' : 'blocked');

    // Sorted Set example
    await redisManager.addToSortedSet('leaderboard', 100, 'player1');
    const rank = await redisManager.getRankInSortedSet('leaderboard', 'player1');
    console.log('Player1 rank:', rank);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await redisManager.quit();
  }
}

main();