const errorHandler = require('./error.controller');

describe('Error Handler', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendErrorDev', () => {
    it('should send detailed error in development mode', () => {
      process.env.NODE_ENV = 'development';

      const err = {
        statusCode: 400,
        status: 'fail',
        message: 'This is a test error',
        stack: 'Error stack trace',
      };

      errorHandler(err, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        error: err,
        message: 'This is a test error',
        stack: 'Error stack trace',
      });
    });
  });

  describe('sendErrorProd', () => {
    it('should send operational error in production mode', () => {
      process.env.NODE_ENV = 'production';

      const err = {
        isOperational: true,
        statusCode: 400,
        status: 'fail',
        message: 'This is an operational error',
      };

      errorHandler(err, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'This is an operational error',
      });
    });

    it('should send generic error message for non-operational error in production mode', () => {
      process.env.NODE_ENV = 'production';

      const err = {
        isOperational: false,
        statusCode: 500,
        status: 'error',
        message: 'This is a non-operational error',
      };

      console.error = jest.fn(); // Mock console.error

      errorHandler(err, res);

      expect(console.error).toHaveBeenCalledWith('ERROR 💥', err);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Something went wrong',
      });
    });
  });
});
