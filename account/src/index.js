const express = require("express");

const Config = require("./config/config");
const accountRoute = require("./routes/account.route");
const app = express();

app.use(express.json());

app.use("/api/v1/account", accountRoute);

app.listen(Config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${Config.PORT}`);
});
