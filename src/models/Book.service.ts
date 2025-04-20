import { T } from "../libs/types/common";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Error";
import {
  Book,
  BookInput,
  BookInquiry,
  BookUpdateInput,
} from "../libs/types/book";
import BookModel from "../schema/Book.model";
import { BookStatus } from "../libs/enums/book.enum";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class BookService {
  private readonly bookModel;
  public viewService;

  constructor() {
    this.bookModel = BookModel;
    this.viewService = new ViewService();
  }

  /** SPA **/

  public async getBooks(inquiry: BookInquiry): Promise<Book[]> {
    const match: T = { bookStatus: BookStatus.PROCESS };

    if (inquiry.bookType) match.bookType = inquiry.bookType;

    if (inquiry.search) {
      match.bookName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.order === "bookPrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.bookModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async getBook(memberId: ObjectId | null, id: string): Promise<Book> {
    const bookId = shapeIntoMongooseObjectId(id);

    let result = await this.bookModel
      .findOne({
        _id: bookId,
        bookStatus: BookStatus.PROCESS,
      })
      .exec();
    // console.log(result);

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // if authenticated users => first => view log creation
    if (memberId) {
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: bookId,
        viewGroup: ViewGroup.BOOK,
      };
      const existView = await this.viewService.checkViewExistense(input);

      if (!existView) {
        console.log("PLANNING TO INSERT NEW VIEW");
        await this.viewService.insertMemberView(input);

        result = await this.bookModel
          .findByIdAndUpdate(bookId, { $inc: { bookViews: +1 } }, { new: true })
          .exec();
      }
    }

    return JSON.parse(JSON.stringify(result)) as Book;

  }

  /** SSR **/

  public async getAllBooks(): Promise<Book[]> {
    const result = await this.bookModel.find().exec();
    if (result.length === 0)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result.map((book) => ({
      ...book.toObject(),
      _id: book._id.toString(),
    }));
  }

  public async createNewBook(input: BookInput): Promise<Book> {
    try {
      const book = await this.bookModel.create(input);
      return book.toObject();
    } catch (err) {
      console.log("Error, model:createNewBook:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenBook(
    id: string,
    input: BookUpdateInput
  ): Promise<Book> {
    // string => ObjectId
    id = shapeIntoMongooseObjectId(id);
    const result = await this.bookModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result.toObject();
  }
}

export default BookService;
