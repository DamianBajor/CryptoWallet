import { connect, connection } from "mongoose";
import { App } from "./app";
import * as dotenv from "dotenv";

dotenv.config();

connect(process.env.MONGODB_URI).then(() => {
  App.listen(process.env.PORT || 7777, () => {
    console.log(`Express running → http://localhost:${process.env.PORT}`);
  });
});

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
