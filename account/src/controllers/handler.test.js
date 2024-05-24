// const {
//   deleteOne,
//   updateOne,
//   createOne,
//   getOne,
//   getAll,
// } = require("./handler.controller");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");

// jest.mock("../utils/catchAsync", () => (fn) => fn);

// describe("Controller Functions", () => {
//   let Model;
//   let req;
//   let res;
//   let next;

//   beforeEach(() => {
//     Model = {
//       findByIdAndDelete: jest.fn(),
//       findByIdAndUpdate: jest.fn(),
//       create: jest.fn(),
//       findById: jest.fn(),
//       find: jest.fn(),
//     };

//     req = {
//       params: {},
//       body: {},
//       query: {},
//     };

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     };

//     next = jest.fn();
//   });

//   describe("deleteOne", () => {
//     it("should delete a document and return 204", async () => {
//       req.params.id = "123";
//       Model.findByIdAndDelete.mockResolvedValue(true);

//       await deleteOne(Model)(req, res, next);

//       expect(Model.findByIdAndDelete).toHaveBeenCalledWith("123");
//       expect(res.status).toHaveBeenCalledWith(204);
//       expect(res.json).toHaveBeenCalledWith({
//         status: "success",
//         data: null,
//       });
//     });

//     it("should call next with an error if no document is found", async () => {
//       req.params.id = "123";
//       Model.findByIdAndDelete.mockResolvedValue(null);

//       await deleteOne(Model)(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next.mock.calls[0][0].message).toBe(
//         "No document found with that ID",
//       );
//       expect(next.mock.calls[0][0].statusCode).toBe(404);
//     });
//   });

//   describe("updateOne", () => {
//     it("should update a document and return 200", async () => {
//       req.params.id = "123";
//       req.body = { name: "Test" };
//       const doc = { id: "123", name: "Test" };
//       Model.findByIdAndUpdate.mockResolvedValue(doc);

//       await updateOne(Model)(req, res, next);

//       expect(Model.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body, {
//         new: true,
//         runValidators: true,
//       });
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         status: "success",
//         data: { data: doc },
//       });
//     });

//     it("should call next with an error if no document is found", async () => {
//       req.params.id = "123";
//       Model.findByIdAndUpdate.mockResolvedValue(null);

//       await updateOne(Model)(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next.mock.calls[0][0].message).toBe(
//         "No document found with that ID",
//       );
//       expect(next.mock.calls[0][0].statusCode).toBe(404);
//     });
//   });

//   describe("createOne", () => {
//     it("should create a document and return 201", async () => {
//       req.body = { name: "Test" };
//       const doc = { id: "123", name: "Test" };
//       Model.create.mockResolvedValue(doc);

//       await createOne(Model)(req, res, next);

//       expect(Model.create).toHaveBeenCalledWith(req.body);
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({
//         status: "success",
//         data: { data: doc },
//       });
//     });

//     it("should call next with an error if creation fails", async () => {
//       req.body = { name: "Test" };
//       Model.create.mockResolvedValue(null);

//       await createOne(Model)(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next.mock.calls[0][0].message).toBe(
//         "No document found with that ID",
//       );
//       expect(next.mock.calls[0][0].statusCode).toBe(404);
//     });
//   });

//   describe("getOne", () => {
//     it("should return a document and return 200", async () => {
//       req.params.id = "123";
//       const doc = { id: "123", name: "Test" };
//       Model.findById.mockReturnValue({
//         populate: jest.fn().mockResolvedValue(doc),
//       });

//       await getOne(Model)(req, res, next);

//       expect(Model.findById).toHaveBeenCalledWith("123");
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         status: "success",
//         data: { data: doc },
//       });
//     });

//     it("should call next with an error if no document is found", async () => {
//       req.params.id = "123";
//       Model.findById.mockReturnValue({
//         populate: jest.fn().mockResolvedValue(null),
//       });

//       await getOne(Model)(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next.mock.calls[0][0].message).toBe(
//         "No document found with that ID",
//       );
//       expect(next.mock.calls[0][0].statusCode).toBe(404);
//     });
//   });

//   describe("getAll", () => {
//     it("should return all documents and return 200", async () => {
//       req.params.accountID = "123";
//       const docs = [
//         { id: "1", name: "Doc1" },
//         { id: "2", name: "Doc2" },
//       ];
//       Model.find.mockResolvedValue(docs);

//       await getAll(Model)(req, res, next);

//       expect(Model.find).toHaveBeenCalledWith({ account: "123" });
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         status: "success",
//         results: docs.length,
//         data: { data: docs },
//       });
//     });

//     it("should call next with an error if no documents are found", async () => {
//       req.params.accountID = "123";
//       Model.find.mockResolvedValue(null);

//       await getAll(Model)(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next.mock.calls[0][0].message).toBe(
//         "No document found with that ID",
//       );
//       expect(next.mock.calls[0][0].statusCode).toBe(404);
//     });
//   });
// });
