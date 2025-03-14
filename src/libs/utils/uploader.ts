import path from "path";
import multer from "multer";
import { v4 } from "uuid"; // random string olsh uchun => v4



function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extention = path.parse(file.originalname).ext;
      const random_name = v4() + extention;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};

export default makeUploader;




/*
const book_storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./uploads/books");
  },
  filename: function (req, file, cd) {
    console.log(file);
    const extension = path.parse(file.originalname).ext;
    const random_name = v4() + extension;
    cd(null, random_name);
  },
});

export const uploadBookImage = multer({ storage: book_storage });
*/