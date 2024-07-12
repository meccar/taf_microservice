const { redisManager } = require("./redis");

const cookieOption = {
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  maxAge: 1000 * 60 * 10,
};

const sessionOption = async () => {
  return {
    store: await redisManager.getRedisStore(),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: cookieOption,
  };
};

const corsOption = {
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

const redisOption = {
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

module.exports = { cookieOption, sessionOption, corsOption, redisOption };
