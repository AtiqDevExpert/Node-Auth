const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const checkForAuth = (req, res, next) => {
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  ) {
    return res.status(400).json({ message: "token required" });
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  next();
};
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWTKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    password: user.password,
  };

  // Set expiration time to 5 minutes (300 seconds)
  const expiresIn = 48 * 60 * 60; // 5 minutes in seconds

  // Generate JWT token with expiration time
  const token = jwt.sign(payload, process.env.JWTKEY, { expiresIn });

  return token;
};
const getUser = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWTKEY);

    if (decodedToken.exp < Date.now() / 1000) {
      console.log("Token has expired");

      return null;
    }

    return decodedToken;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token has expired");
    } else {
      console.error("Error decoding token:", error.message);
    }
    return null;
  }
};
module.exports = { checkForAuth, verifyToken, setUser, getUser };
