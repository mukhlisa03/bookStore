import {Request, Response} from 'express';
import { T } from "../libs/types/common";
import MemberService from '../models/Member.service';


const libraryController: T = {};
libraryController.goHome = (req: Request, res: Response) => {
    try {
        console.log('goHome');
        res.send('Home Page!');
    }catch (err) {
        console.log("Error, goHome", err);
    }
};

libraryController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('getLogin');
        res.send('Login Page!');
    }catch (err) {
        console.log("Error, getLogin", err);
    }
};

libraryController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup');
        res.send('Signup Page!');
    }catch (err) {
        console.log("Error, getSignup", err);
    }
};

export default libraryController;