const express = require("express");

const Config = require("./config/config");

const app = express();

app.use(express.json());

app.listen(Config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${Config.PORT}`);
});
