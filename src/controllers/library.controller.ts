import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const memberService = new MemberService();

const libraryController: T = {};
libraryController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home Page!");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

libraryController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page!");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

libraryController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page!");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};


libraryController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.LIBRARY;
    const result = await memberService.processSignup(newMember);
    // TODO: SESSIONS Authentication

    res.send(result);
  } catch (err) {
    console.log("Error, processSignup", err);
    res.send(err);
  }
};

libraryController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    // TODO: SESSIONS Authentication

    res.send(result);
  } catch (err) {
    console.log("Error, processLogin", err);
    res.send(err);
  }
};



export default libraryController;
