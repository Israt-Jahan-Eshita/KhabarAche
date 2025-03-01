import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  console.log("Extracted Token:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    console.log("Decoded User:", decoded); 
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); 
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;

