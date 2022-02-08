import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;
app.use(express.json());
// Mongo DB Connection
import DB from "./db/connection.js";
DB();

// Routes
import routes from "./routes.js";
app.use(routes);

// Server Listening
app.listen(port, () => {
  console.log("Server is running at", port);
});
