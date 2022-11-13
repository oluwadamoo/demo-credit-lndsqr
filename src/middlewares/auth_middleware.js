import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const verifyToken = async (request, response, next) => {
  const token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"];

  if (!token) {
    return response.status(403).json({
      success: false,
      message: "A token is required for authentication",
    });
  }
  try {
    let tokenKey = process.env.TOKEN_KEY;

    const decoded = jwt.verify(token, tokenKey);
    request.user = decoded;
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
  return next();
};

export default verifyToken;
