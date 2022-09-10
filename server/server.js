const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { v4: uuid } = require('uuid'); // 버젼 4 사용
const mime = require('mime-types');
// 몽고디비 연결
const mongoose = require('mongoose');
// 몽고디비 환경변수 연결
const config = require('./config/keys');
// model(테이블) 연결
const { Image } = require('./models/Image');

const storage = multer.diskStorage({
  // 성공의 경우 콜백함수 호출의 첫번째 인수가 null, 실패의 경우 첫번째 인수는 에러 객체
  destination: (req, file, cb) => cb(null, './uploads'), // 어디 저장할지
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`), // 무슨이름으로 저장할지
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true);
    else cb(new Error(`invalid file type.`), false);
    // jpeg 또는 png 파일만 업로드 가능하도록 필터링 적용
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 업로드 이미지 파일 용량 제한 적용: 5메가
  },
});

const app = express();
const PORT = 5000;
app.use(cors());
// * 먼저 몽고디비와 연결시키고 난 후에 라우팅하기 위해 then 안에서 라우팅
mongoose
  .connect(config.mongoURI) // promise를 리턴하므로 then 체이닝 가능
  .then(() => {
    console.log('mongoDB 연결됨');

    app.use('/uploads', express.static('uploads')); // 클라이언트에서 서버의 정적 파일에 접근할 수 있도록

    app.post('/images', upload.single('image'), async (req, res) => {
      const image = await new Image({
        key: req.file.filename,
        originalFileName: req.file.originalname,
      }).save();
      // db에 저장되고 난 후 응답을 보내도록 async/await으로 비동기 처리
      res.status(200).json(image);
    });

    app.get('/images', async (req, res) => {
      const images = await Image.find(); // 전체 이미지들 불러오기
      res.status(200).json(images);
    });

    app.listen(PORT, () => {
      console.log(`${PORT}번 포트로 서버 실행중`);
    });
  })
  .catch(err => console.log(`${err}`));

// uuid: 유저가 업로드한 파일에 고유한 uuid를 부여하기 위해 사용
// mime-types: jpeg 포맷으로 넘어오지 않고 있기 때문에 이를 특정 포맷으로 바꿔 저장하기 위해 사용
// multer 미들웨어: 이미지 업로드 request에서 이미지를 뽑아와서 uploads 폴더에 저장해준다.
// 미들웨어: 요청이 오고 해당 요청에 대한 어떠한 작업을 거쳐서 응답으로 보낼 수 있게 중간에서 실행되는 것들
// 이미지는 요청 메시지 body에서 form-data 형식이다.(키-값 쌍) Key: text or file
