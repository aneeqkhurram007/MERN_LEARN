import express from "express";
import User from "./models/userSchema.js";
import bcrypt from "bcryptjs";

const routes = express.Router();

// Middleware
const middlware = (req, res, next) => {
  next();
};

routes.get("/", (req, res) => {
  res.send("Hello from Home");
});
routes.get("/about", middlware, (req, res) => {
  res.cookie("name", "John");
  res.send("Hello from About");
});
routes.get("/contact", (req, res) => {
  res.send("Hello from Contact");
});
routes.get("/profile", (req, res) => {
  res.send("Hello from Profile");
});
// Registeration Route
routes.post("/register", async (req, res) => {
  const { name, email, phone, password, rpassword, work } = req.body;
  if (!name || !email || !phone || !password || !rpassword || !work) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  if (password !== rpassword) {
    return res.status(406).json({ error: "Password does not match" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "User with this email already exists" });
    }
    const user = new User(req.body);
    const userRes = await user.save();
    if (userRes) {
      res.status(201).json({ message: "User registered successfully" });
    } else res.status(500).json({ error: "Failed to register user" });
  } catch (error) {
    console.log(error);
  }
});
// Login Route
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ error: "User not found" });
  } else {
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      const token = await user.generateAuthToken();
      console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600 * 1000),
        httpOnly: true,
      });
      res.status(201).json({ message: "User logged in successfully" });
    } else {
      res.status(404).json({ error: "Invalid credentials" });
    }
  }
});
export default routes;
