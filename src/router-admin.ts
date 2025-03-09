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

/** BOOK **/
/** USER **/    

export default routerAdmin;