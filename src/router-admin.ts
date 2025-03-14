import express from "express";
const routerAdmin = express.Router();
import libraryController from "./controllers/library.controller";
import bookController from "./controllers/book.controller";

/** LIBRARY **/
routerAdmin.get("/", libraryController.goHome);
routerAdmin
  .get("/login", libraryController.getLogin)
  .post("/login", libraryController.processLogin);
routerAdmin
  .get("/signup", libraryController.getSignup)
  .post("/signup", libraryController.processSignup);
routerAdmin.get("/logout", libraryController.logout);
routerAdmin.get("/check-me", libraryController.checkAuthSession);

/** BOOK **/
routerAdmin.get(
  "/book/all",
  libraryController.verifyLibrary,
  bookController.getAllBooks
);
routerAdmin.post(
  "/book/create",
  libraryController.verifyLibrary,
  bookController.createNewBook
);
routerAdmin.post(
  "/book/:id",
  libraryController.verifyLibrary,
  bookController.updateChosenBook
);

/** USER **/

export default routerAdmin;
