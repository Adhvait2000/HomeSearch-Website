// Simple middleware for handling exceptions inside of async express routes 
// and passing them to your express error handlers.


const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
