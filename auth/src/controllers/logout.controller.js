const logoutController = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  req.session = null;

  return res.status(200).json({ status: "success" });
};

module.exports = logoutController;
