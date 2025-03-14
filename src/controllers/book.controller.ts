import {Request, Response} from 'express';
import Errors from "../libs/Error";
import { T } from "../libs/types/common";
import BookService from '../models/Book.service';

const bookService = new BookService();

const bookController: T = {};


bookController.getAllBooks = async (req: Request, res: Response) => {
  try {
    console.log("getAllBooks");
    res.render("books");
    
  } catch (err) {
    console.log("Error, getAllBooks", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};


bookController.createNewBook = async (req: Request, res: Response) => {
  try {
    console.log("createNewBook");
    res.send("DONE!");
    
  } catch (err) {
    console.log("Error, createNewBook", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};


bookController.updateChosenBook = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenBook");
    
  } catch (err) {
    console.log("Error, updateChosenBook", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default bookController;

