import express from 'express';
const routerAdmin = express.Router();
import libraryController from './controllers/library.controller';

routerAdmin.get('/', libraryController.goHome);

routerAdmin.get('/login', libraryController.getLogin);

routerAdmin.get('/signup', libraryController.getSignup);


export default routerAdmin;