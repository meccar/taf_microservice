const express = require("express");

const Config = require("./config/config");
const productRoute = require("./routes/product.route");

const app = express();

app.use(express.json());

app.use("/api/v1/product", productRoute);

app.listen(Config.PORT, () => {
// eslint-disable-next-line no-console
  console.log(`Server is listening on port ${Config.PORT}`);
});

