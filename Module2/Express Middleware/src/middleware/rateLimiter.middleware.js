const requestCounts = {};
const WINDOW_TIME = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15;

module.exports = function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, startTime: currentTime };
    return next();
  }

  const elapsed = currentTime - requestCounts[ip].startTime;

  if (elapsed > WINDOW_TIME) {
    requestCounts[ip] = { count: 1, startTime: currentTime };
    return next();
  }

  if (requestCounts[ip].count >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests, please try again later",
    });
  }

  requestCounts[ip].count++;
  next();
};
