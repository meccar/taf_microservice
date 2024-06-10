const AppError = require("../utils/appError");

exports.CreateOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    await doc.save();

    // const usetJWT = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   "asdf",
    // );

    // req.session = {
    //   jwt: usetJWT,
    // };

    return res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
