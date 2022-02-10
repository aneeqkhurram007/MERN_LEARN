import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const tokenUser = jwt.verify(token, process.env.JWT_SECRET);
    const rootUser = await User.findOne({
      _id: tokenUser._id,
      "tokens.token": token,
    });
    if (!rootUser) throw new Error("User not found");
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized Token" });
  }
};
export default authenticate;
