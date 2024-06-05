const express = require("express");

const app = express();

const PORT = 8001;

app.use(express.json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
