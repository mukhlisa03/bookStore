import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Error";

const memberService = new MemberService();

const libraryController: T = {};
libraryController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home"); // send | render | redirect | json
  } catch (err) {
    console.log("Error, goHome", err);
    res.redirect("/admin");
  }
};

libraryController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
    res.redirect("/admin");
  }
};

libraryController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
    res.redirect("/admin");
  }
};

libraryController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    console.log("req.body:", req.body);
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.LIBRARY;
    const result = await memberService.processSignup(newMember);

    req.session.member = result; // sesion collectionning member qsmiga resultda yangi hosil bolgan libraryni qoshadi
    req.session.save(function () {
      res.redirect("/admin/book/all");
    });
  } catch (err) {
    console.log("Error, processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup') </script> `
    );
  }
};

libraryController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");

    console.log("req.body: ", req.body);

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);

    req.session.member = result; // sesion collectionning member qsmiga resultda yangi hosil bolgan libraryni qoshadi
    req.session.save(function () {
      res.redirect("/admin/book/all");
    });
  } catch (err) {
    console.log("Error, processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script> `
    );
  }
};

libraryController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      // destroy qlshni kutsh
      res.redirect("/admin"); // destroy bolb adminga yuboradi
    });
  } catch (err) {
    console.log("Error, logout", err);
    res.redirect("/admin");
  }
};

libraryController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("result:", result);

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers", err);
    res.redirect("/admin/login");
  }
};

libraryController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

libraryController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      // krb kelyotgan req ning session qsmdan member qdrladi
      res.send(`<script> alert("${req.session.member.memberNick}") </script> `);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

libraryController.verifyLibrary = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.LIBRARY) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}; window.location.replace('/admin/login'); </script>`
    );
  }
};

export default libraryController;
