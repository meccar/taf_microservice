const express = require("express");

const Config = require("./config/config");

const app = express();

app.use(express.json());

app.use("/", (req, res, next) => {
    return res.status(200).json({"message":"Hello post"})
}) 

app.listen(Config.PORT, () => {
    console.log(`Server is listening on port ${Config.PORT}`)
})