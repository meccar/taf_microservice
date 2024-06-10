const mongoose = require("mongoose");

const Config = require("./config/config");
const app = require("./index");

const url = Config.MONGODB.replace("<password>", Config.MONGODB_PASSWORD);

// eslint-disable-next-line no-console
mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.listen(Config.PORT, () => {
  console.log(`Listening on port ${Config.PORT}`);
});
