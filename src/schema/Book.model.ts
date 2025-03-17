import mongoose, { Schema } from "mongoose";
import { BookStatus } from "../libs/enums/book.enum";

const bookSchema = new Schema(
  {
    bookStatus: {
      type: String,
      enum: BookStatus,
      default: BookStatus.PAUSE,
    },

    bookName: {
      type: String,
      required: true,
    },

    bookPrice: {
      type: Number,
      required: true,
    },

    bookType: {
      type: String,
      required: true,
    },

    bookImages: {
      type: [String],
      required: true,
    },

    bookAuthor: {
      type: String,
      required: true,
    },

    bookLanguage: {
      type: String,
      required: true,
    },

    bookDesc: {
      type: String,
      required: true,
    },

    bookViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // createdAt va UpdatedAt
);

bookSchema.index({ bookName: 1, bookDesc: 1 }, { unique: true });
export default mongoose.model("Book", bookSchema);
