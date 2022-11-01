import mongoose from "mongoose";

const DB_URL =
  process.env.MONGODB_URL ||
  "Please Check MongoDB Server URL.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("MongoDB Server Connected." + DB_URL)
);
db.on("error", (error) =>
  console.error("\nMongoDB Connect Failed.\n" + DB_URL + "\n" + error)
);

export * from "./models/user-model";
