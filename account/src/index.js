const express = require("express");
const cluster = require("cluster");
const os = require("os");

const Config = require("./config/config");
const accountRoute = require("./routes/account.route");

const app = express();

app.use(express.json());

app.use("/api/v1/account", accountRoute);

if (cluster.isMaster) {
  // console.log("Master has been started ...");
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i += 1) {
    cluster.fork();
  }
} else {
  // console.log("Worker process started ...");
  app.listen(Config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${Config.PORT}`);
  });
}
