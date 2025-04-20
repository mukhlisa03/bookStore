import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import bookController from "./controllers/book.controller";

/** MEMBER **/
router.get("/member/library", memberController.getLibrary);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);

router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers);

/** Book **/
router.get("/book/all", bookController.getBooks);
router.get("/book/:id", memberController.retrieveAuth, bookController.getBook);

/** Order **/

export default router;
