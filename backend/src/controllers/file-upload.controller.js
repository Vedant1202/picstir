const multer = require('multer');
const path = require('path');

const postStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../../frontend/public/uploads/posts/'));
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`);
  },
});

const profileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../../frontend/public/uploads/profile/'));
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`);
  },
});

module.exports = { postStorage, profileStorage };
