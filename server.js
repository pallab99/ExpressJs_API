import { app } from "./app.js";
import "dotenv/config";
import { connectDB } from "./configs/database/databaseConnection.js";

connectDB();

const port = process.env.PORT;


app.listen(port, () => {
  console.log("server is running");
});
