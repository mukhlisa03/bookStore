import {Request, Response} from 'express';
import { T } from "../libs/types/common";
import MemberService from '../models/Member.service';
import { MemberInput } from '../libs/types/member';
import { MemberType } from '../libs/enums/member.enum';


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

libraryController.processLogin = (req: Request, res: Response) => {
    try {
        console.log('processLogin');
        res.send("DONE!");
    }catch (err) {
        console.log("Error, processLogin", err);
    }
};

libraryController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log('processSignup');
         console.log("body", req.body);

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.LIBRARY;

         const memberService = new MemberService();
         const result = await memberService.processSignup(newMember);
        res.send(result);
    }catch (err) {
        console.log("Error, processSignup", err);
        res.send(err);
    }
};

export default libraryController;