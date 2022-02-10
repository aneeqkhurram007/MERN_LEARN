import express from "express";
import User from "./models/userSchema.js";
import bcrypt from "bcryptjs";
import authenticate from "./middleware/authenticate.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello from Home");
});
routes.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});
routes.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message)
      throw new Error("Please fill all the fields");
    const userContact = await User.findOne({ _id: req.userId });
    if (!userContact) throw new Error("User not found");
    const userMessage = await userContact.addMessage(message);
    await userContact.save();
    res.status(200).json({ message: userMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
routes.get("/profile", (req, res) => {
  res.send("Hello from Profile");
});
//
routes.get("/getData", authenticate, (req, res) => {
  res.send(req.rootUser);
});
// Registeration Route
routes.post("/signup", async (req, res) => {
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
