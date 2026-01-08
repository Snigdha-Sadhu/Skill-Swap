const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach userId to socket
    socket.userId = decoded.user.id;

    next();
  } catch (err) {
    console.error("Socket auth error:", err.message);
    next(new Error("Socket authentication failed"));
  }
};

module.exports = socketAuth;
