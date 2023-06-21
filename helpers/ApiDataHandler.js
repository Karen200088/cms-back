class ApiDataHandler {

  status;
  message;
  data;

  constructor(status, message, data) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  emptyData(message) {
    return new ApiDataHandler(200, message, [])
  }

  successRequest(status, message, data = []) {
    return new ApiDataHandler(status, message, data);
  }


}

export default new ApiDataHandler();