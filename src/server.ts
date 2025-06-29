import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let server: Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dssil.mongodb.net/note-with-mongoose?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("EventZen Server Connected to mongodb using mongoose");
    server = app.listen(PORT, () => {
      console.log(`EventZen Server App is listening on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
