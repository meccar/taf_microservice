const serialize = (data) => {
  switch (data.type) {
    case "user":
      return {
        username: data.username,
        password: data.password,
      };
    case "session":
      return {
        userId: data.userId,
        username: data.username,
      };
    default:
      throw new Error("Unknown data type");
  }
};

module.exports = serialize;
