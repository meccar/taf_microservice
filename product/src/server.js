const https = require("https");
const mongoose = require("mongoose");

const Config = require("./config/config");
const app = require("./index");

const url = Config.MONGODB.replace("<password>", Config.MONGODB_PASSWORD);

// eslint-disable-next-line no-console
mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

https
  .createServer(
    {
      key: Config.key,
      cert: Config.cert,
    },
    app,
  )
  .listen(Config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${Config.PORT}`);
  });
