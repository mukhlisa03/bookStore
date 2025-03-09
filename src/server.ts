console.log("EXECUTED!");

// import moment from "moment";
// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime);

// const person: string = "Mukhlisa";
// const count: number = 100; 



import dotenv from "dotenv"; 
dotenv.config(); 

import app from "./app";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);


mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succeed!");
    const PORT = process.env.PORT ?? 2003; 
    app.listen(PORT, function () {
      console.info(`The server is running successfully on port: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`); // Admin projectning homepage ga yuboradi
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));