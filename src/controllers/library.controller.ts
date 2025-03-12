import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Message } from "../libs/Error";

const memberService = new MemberService();

const libraryController: T = {};
libraryController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

libraryController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

libraryController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};


libraryController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.LIBRARY;
    const result = await memberService.processSignup(newMember);

    req.session.member = result;  // sesion collectionning member qsmiga resultda yangi hosil bolgan libraryni qoshadi
    req.session.save(function () {
      res.send(result);
    });

  } catch (err) {
    console.log("Error, processSignup", err);
    res.send(err);
  }
};


libraryController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);

    req.session.member = result;  // sesion collectionning member qsmiga resultda yangi hosil bolgan libraryni qoshadi
    req.session.save(function () {
      res.send(result);
    });

  } catch (err) {
    console.log("Error, processLogin", err);
    res.send(err);
  }
};


libraryController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if(req.session?.member)  // krb kelyotgan req ning session qsmdan member qdrladi
      res.send(`<script> alert("${req.session.member.memberNick}") </script> `); 
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};




export default libraryController;
