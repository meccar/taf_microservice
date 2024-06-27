module.exports = {
  ...require("./config/config"),

  ...require("./controllers/error.controller"),

  ...require("./middlewares/auth.middleware"),
  ...require("./middlewares/verify.middleware"),

  ...require("./utils/apiFeatures"),
  ...require("./utils/appError"),
  ...require("./utils/catchAsync"),
  // ...require("./utils/jwt"),
  ...require("./utils/validation"),

  ...require("../dist/events/listener.event"),
  ...require("../dist/events/publisher.event"),
  ...require("../dist/events/product-created-event"),
  ...require("../dist/events/product-updated-event"),
  ...require("../dist/events/subject"),
};
