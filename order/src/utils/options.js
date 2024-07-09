const { redisManager } = require("@tafvn/common");

const cookieOption = {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
}

const sessionOption = {
    store: redisManager.getRedisStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: cookieOption
}

const corsOption = {
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}

const redisOption = {
    username: "default",
    password: "secret",
    socket: {
        host: "my-redis.cloud.redislabs.com",
        port: 6379,
        tls: true,
        key: fs.readFileSync("./redis_user_private.key"),
        cert: fs.readFileSync("./redis_user.crt"),
        ca: [fs.readFileSync("./redis_ca.pem")],
    },
};

module.exports = { cookieOption, sessionOption, corsOption, redisOption }