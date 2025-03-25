import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadImage = multer({ storage: imageStorage }).single("image");
export const uploadDocument = multer({ storage: documentStorage }).single(
  "document"
);
