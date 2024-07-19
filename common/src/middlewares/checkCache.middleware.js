const { catchAsync } = require("../utils/catchAsync");
const { redisManager } = require("../redis/client");

const checkCache = catchAsync(async (req, res, next) => {
  const { key } = req.params;
  const cachedData = await redisManager.get(key);

  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  next();
});

module.exports = checkCache;
