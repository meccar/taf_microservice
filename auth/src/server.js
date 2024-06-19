const mongoose = require("mongoose");

const app = require("./index");

const url = process.env.MONGODB.replace(
  "<password>",
  process.env.MONGODB_PASSWORD,
);

// eslint-disable-next-line no-console
mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
