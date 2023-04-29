const AWS = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');

const { v4 } = require('uuid');
const uuid = v4();

const s3 = new AWS.S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SERCETACCESSKEY,
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${uuid}`);
    },
  }),
});

module.exports = { upload };
