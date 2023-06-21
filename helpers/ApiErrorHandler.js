class ApiErrorHandler {

  status;
  message;
  error;

  constructor(status, message, error) {
    this.status = status;
    this.message = message;
    this.error = error;
  }

  unauthorizedError() {
    return new ApiErrorHandler(401, "User not authorized", [])
  }

  badRequest(status, message, errors = []) {
    return new ApiErrorHandler(status, message, errors);
  }


}

export default new ApiErrorHandler();