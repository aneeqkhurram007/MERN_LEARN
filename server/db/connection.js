import mongoose from "mongoose";
export default () =>
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connection Established"))
    .catch((err) => console.log(err));
