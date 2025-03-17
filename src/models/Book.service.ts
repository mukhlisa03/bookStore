import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Error";
import { Book, BookInput, BookUpdateInput } from "../libs/types/book";
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
      if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

      return result.toObject();
  }
}

export default BookService;
