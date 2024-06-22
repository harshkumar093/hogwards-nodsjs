const ResponseMessage = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data,
  };
};

module.exports = {
  ResponseMessage,
};
