const { DateTime } = require("luxon");

const deserialize = (id, data) => {
  switch (data.type) {
    case "user":
      return {
        id,
        username: data.username,
        password: data.password,
      };
    case "session":
      return {
        id,
        userID: data.userID,
        session: data.session,
      };
    case "item":
      return {
        id,
        name: data.name,
        description: data.description,
        imageURL: data.imageURL,
        views: parseInt(data.views),
        price: parseFloat(data.price),
        createdAt: DateTime.fromMillis(parseInt(data.createdAt)),
        endingAt: DateTime.fromMillis(parseInt(data.endingAt)),
      };
    default:
      throw new Error("Unknown data type");
  }
};

module.exports = deserialize;
