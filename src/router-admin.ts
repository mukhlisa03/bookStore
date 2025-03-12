import express from 'express';
const routerAdmin = express.Router();
import libraryController from './controllers/library.controller';


/** LIBRARY **/
routerAdmin.get('/', libraryController.goHome);
routerAdmin
    .get("/login", libraryController.getLogin) 
    .post("/login", libraryController.processLogin);
routerAdmin
    .get("/signup", libraryController.getSignup) 
    .post("/signup", libraryController.processSignup);

routerAdmin.get("/check-me", libraryController.checkAuthSession);

/** BOOK **/
/** USER **/    

export default routerAdmin;