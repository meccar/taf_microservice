const serialize = (data) => {
  switch (data.type) {
    case "user":
      return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        endingdAt: data.endingdAt.toMillis(),
        username: data.username,
        password: data.password,
      };
    case "session":
      return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        endingdAt: data.endingdAt.toMillis(),
        userId: data.userId,
        username: data.username,
      };
    default:
      throw new Error("Unknown data type");
  }
};

module.exports = serialize;
