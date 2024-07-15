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
    default:
      throw new Error("Unknown data type");
  }
};

module.exports = deserialize;
