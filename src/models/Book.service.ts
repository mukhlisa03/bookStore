import Errors, { HttpCode, Message } from "../libs/Error";
import { Book, BookInput } from "../libs/types/book";
import BookModel from "../schema/Book.model";

class BookService {
  private readonly bookModel;

  constructor() {
    this.bookModel = BookModel;
  }

  /** SPA **/

  /** SSR **/

  public async createNewBook(input: BookInput): Promise<Book> {
    try {
        const book = await this.bookModel.create(input);
        return book.toObject();
    } catch (err) {
        console.log("Error, model:createNewBook:", err)
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default BookService;
