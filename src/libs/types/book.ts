import { ObjectId } from "mongoose";
import { BookStatus } from "../enums/book.enum";

export interface Book {
  _id: ObjectId;
  bookStatus: BookStatus;
  bookName: string;
  bookPrice: number;
  bookType: string;
  bookImages: string[];
  bookAuthor: string;
  bookLanguage: string;
  bookDesc: string;
  bookViews: number;
}

export interface BookInput {
  bookStatus?: BookStatus;
  bookName: string;
  bookPrice: number;
  bookType: string;
  bookImages: string[];
  bookAuthor: string;
  bookLanguage: string;
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
  bookLanguage?: string;
  bookDesc?: string;
  bookViews?: number;
}
