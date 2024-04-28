const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const Config = require("./config/config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/account", proxy("http://localhost:3001"));
app.use("/api/v1/post", proxy("http://localhost:3002"));

app.listen(Config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Gateway is listening on port ${Config.PORT}`);
});
