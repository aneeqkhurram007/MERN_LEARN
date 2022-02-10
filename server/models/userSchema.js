import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rpassword: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.rpassword = await bcrypt.hash(this.rpassword, 12);
  }
  next();
});
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};
userSchema.methods.addMessage = async function (message) {
  try {
    this.messages = this.messages.concat({
      message,
    });
    await this.save();
    return "Message added successfully";
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model("User", userSchema);
export default User;
