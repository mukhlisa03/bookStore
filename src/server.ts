console.log("EXECUTED!");

// import moment from "moment";

// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime);

// const person: string = "Mukhlisa";
// const count: number = 100; 


import dotenv from "dotenv"; 
dotenv.config(); 

console.log("PORT:", process.env.PORT);
console.log("MONGO_URL:", process.env.MONGO_URL);