module.exports = {
  ...require("./config/config"),

  ...require("./controllers/error.controller"),
  ...require("./controllers/handler.controller"),

  ...require("./middlewares/auth.middleware"),
  ...require("./middlewares/verify.middleware"),
  ...require("./middlewares/checkCache.middleware"),

  ...require("./utils/apiFeatures"),
  ...require("./utils/appError"),
  ...require("./utils/catchAsync"),
  ...require("./utils/natsWrapper"),
  ...require("./utils/validation"),
  ...require("./utils/options"),

  ...require("./redis/client"),

  ...require("./dist/events/listener.event"),
  ...require("./dist/events/publisher.event"),
  ...require("./dist/events/product-created-event"),
  ...require("./dist/events/product-updated-event"),
  ...require("./dist/events/subject"),
  ...require("./dist/events/types/order.status"),
};
