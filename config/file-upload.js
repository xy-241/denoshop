const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  region: 'ap-southeast-1'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'denoship-comments',
    acl: 'public-read',
    metadata: (req, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
      //let fileType = (file.mimetype === 'image/jpeg') ? 'jpg' : 'png'
      let fileType = '';
      console.log("File MIME type = ", file.mimetype)
      switch (file.mimetype) {
        case "image/jpeg":
          fileType = "jpg";
          break;
        case "image/png":
          fileType = "png";
          break;
        case "image/gif":
          fileType = "gif";
          break;
        case "video/mpeg":
          fileType = "mpeg"
          break;
        case "video/mp4":
          fileType = "mp4"
          break;
      }
      callback(null, `${Date.now().toString()}.${fileType}`)
    }
  })
})

module.exports = upload;