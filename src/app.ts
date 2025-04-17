import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session); // var name => MongoDbStore
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL), // env dan String holda oladi
  collection: "sessions", // collection name => sessions
});


/** 1-ENTRANCE **/
const app = express();
// console.log("__dirname:", __dirname); // joylashuvni korsatadi
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** 2-SESSIONS **/
app.use(
  session({
    secret: String(process.env.SESSION_SECRET), //env ichidan olndi string holatda(tashqi olamga korsatsh mn emas)
    cookie: {
      // maxAge: 1000 * 3600 * 3, // 3h amal qlshi
      maxAge: 1000 * 3600 * 24,
    },
    store: store, // yuqorida hosl qlngan store qiymati(session -> mongodb ni session qsmida)
    resave: true, // amal qlsh muddati 
    saveUninitialized: true,
  })
);


app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
})

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTERS **/
app.use("/admin", routerAdmin); // SSR => Adminka loyihasi uchun => backendda frontendni qurb olsh
app.use("/", router);  // SPA: REACT

export default app;