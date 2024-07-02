const mongoose = require("mongoose");
const https = require("https");

const app = require("./index");

const url = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

async function start() {
  try {
    await mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

    https
      .createServer(
        {
          key: process.env.key,
          cert: process.env.cert,
        },
        app
      )
      .listen(process.env.PORT, () => {
        console.log(`Server is listening on ${process.env.PORT}`);
      });
  } catch (err) {
    console.error(err);
  }
}

start();
