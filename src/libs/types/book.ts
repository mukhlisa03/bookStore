import { ObjectId } from "mongoose";
import { BookLanguage, BookStatus } from "../enums/book.enum";

export interface Book {
  _id: string | ObjectId;
  bookStatus: BookStatus;
  bookName: string;
  bookPrice: number;
  bookType: string;
  bookImages: string[];
  bookAuthor: string;
  bookLanguage: BookLanguage;
  bookDesc: string;
  bookViews: number;
}

export interface BookInquiry {
  order: string;
  page: number;
  limit: number;
  bookLanguage?: BookLanguage;
  search?: string;
}

export interface BookInput {
  bookStatus?: BookStatus;
  bookName: string;
  bookPrice: number;
  bookType: string;
  bookImages: string[];
  bookAuthor: string;
  bookLanguage: BookLanguage;
  bookDesc: string;
  bookViews?: number;
}

export interface BookUpdateInput {
  _id: ObjectId;
  bookStatus?: BookStatus;
  bookName?: string;
  bookPrice?: number;
  bookType?: string;
  bookImages?: string[];
  bookAuthor?: string;
  bookLanguage?: BookLanguage;
  bookDesc?: string;
  bookViews?: number;
}
