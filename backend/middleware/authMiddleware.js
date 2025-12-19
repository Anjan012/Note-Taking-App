import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
      req.userId = decoded.userId; // Assume token has userId
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.log(`Auth Middleware: ${error}`);
  }
};
