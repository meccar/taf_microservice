
const {createClient} = require("redis")
const { catchAsync } = require("@tafvn/common");


let client = undefined;

const options = {
    EX: 21600,
}

const redisClient = catchAsync(async () => {
    // const client = createClient({
    //     username: 'default', // use your Redis user. More info https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/
    //     password: 'secret', // use your password here
    //     socket: {
    //         host: 'my-redis.cloud.redislabs.com',
    //         port: 6379,
    //         tls: true,
    //         key: readFileSync('./redis_user_private.key'),
    //         cert: readFileSync('./redis_user.crt'),
    //         ca: [readFileSync('./redis_ca.pem')]
    //     }
    // });
    client = createClient({ url: process.env.REDIS_URI });
    client.on("error", (error) => console.error(`Error: ${error}`));
    await client        
        .connect()
        .then(() => console.log(`Connected to Redis!`));
});

function requestToKey(req) {
    const reqDataToHash = {
      query: req.query,
      body: req.body,
    };
  
    return `${req.path}@${hash.sha1(reqDataToHash)}`;
  }

function isRedisWorking() {
    return !!client?.isOpen;
  }

async function readData(key) {
    let cachedValue = undefined;
    if (isRedisWorking()) {
        return await redisClient.get(key);
    }

    return cachedValue;
}

async function writeData(key, data, options) {
    await redisClient.set(key, data, options);
}

const redisCaching = catchAsync( async (req, res, next) => {
    if(isRedisWorking()) {
        const key = requestToKey(req)
        const cachedValue = readData(key)
        if (cachedValue) {
            return res.json(JSON.parse(cachedValue))
        } else {
            const oldSend = res.send
            
            res.send = function (data) {
                res.send = oldSend;
      
                if (res.statusCode.toString().startsWith("2")) {
                  writeData(key, data, options).catch(console.error)
                }
      
                return res.send(data);
              };
        }

        next()
    } else {
        next()
    }
})

module.exports = {redisClient, redisCaching}