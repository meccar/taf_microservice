const https = require("https");
const mongoose = require("mongoose");

const Config = require("./config/config");
const app = require("./index");

const url = process.env.MONGODB.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

https
  .createServer(
    {
      key: Config.key,
      cert: Config.cert,
    },
    app
  )
  .listen(Config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${Config.PORT}`);
  });
