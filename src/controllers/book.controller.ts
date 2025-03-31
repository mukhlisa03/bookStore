import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import BookService from "../models/Book.service";
import { BookInput } from "../libs/types/book";
import { AdminRequest } from "../libs/types/member";

const bookService = new BookService();

const bookController: T = {};
/** SPA **/


/** SSR **/

bookController.getAllBooks = async (req: Request, res: Response) => {
  try {
    console.log("getAllBooks");
    const data = await bookService.getAllBooks();
    console.log("data:", data);

    res.render("books", {books: data});
  } catch (err) {
    console.log("Error, getAllBooks", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

bookController.createNewBook = async (req: AdminRequest, res: Response) => {
  try {
    console.log("createNewBook");
    console.log("req.body:", req.body);
    // console.log("req.files", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: BookInput = req.body;
    data.bookImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    await bookService.createNewBook(data);

    res.send(
      `<script> alert("Succesful creation!"); window.location.replace('/admin/book/all') </script> `
    );
  } catch (err) {
    console.log("Error, createNewBook", err);
        const message =
          err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert(${message}); window.location.replace('/admin/book/all') </script> `
    );
  }
};

bookController.updateChosenBook = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenBook");
    const id = req.params.id;
    // console.log("id:", id);

    const result = await bookService.updateChosenBook(id, req.body);

    res.status(HttpCode.OK).json({data: result});
  } catch (err) {
    console.log("Error, updateChosenBook", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default bookController;
