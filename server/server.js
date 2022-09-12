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
const { User } = require('./models/User');
// 폴더를 분리해서 작성해둔 인증 처리하는 함수 가져오기
const { auth } = require('./middleware/auth');

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

    // * 2.1 회원가입 요청의 응답
    app.post('/api/users/register', (req, res) => {
      // 회원가입시 클라이언트 단에서 입력된 정보를 가져와 데이터베이스에 저장한다.
      // req.body에 json 객체로 키-값 이 들어가있다.
      const user = new User(req.body); // 정의한 모델을 불러와 요청 안의 데이터로 새 인스턴스 생성
      user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
        });
      });
      // save: 몽고디비의 메서드 - 콜백함수로 에러, 저장된 데이터를 매개변수로 받는다.
      // userInfo = ( user = new User(req.body) )
    });

    // * 2.2 로그인 요청의 응답
    // 1. 로그인 요청으로 온 이메일 주소가 데이터베이스에 존재하는지 확인한다.
    // 2. 이메일 주소가 데이터베이스에 있다면 비밀번호의 일치 여부를 확인한다.
    // 3. 이메일과 비밀번호가 모두 일치하면 토큰을 생성한다.
    app.post('/api/users/login', (req, res) => {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
          return res.json({
            loginSuccess: false,
            message: '가입되지 않은 사용자입니다. 이메일 주소를 확인해주세요',
          });
        }
        // 요청된 이메일이 데이터베이스에 존재할 경우 비밀번호 일치 여부 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: '비밀번호가 틀렸습니다.',
            });
          }

          // 비밀번호가 일치하는 경우 - 토큰을 생성한다.
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            // 토큰을 저장하는 곳은 쿠키, 세션스토리지, 로컬스토리지 다양함. 여기서는 쿠키에 저장해본다.
            res
              .cookie('x_auth', user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          });
        });
      });
    });

    app.post('/api/images', upload.single('image'), async (req, res) => {
      const image = await new Image({
        key: req.file.filename,
        originalFileName: req.file.originalname,
      }).save();
      // db에 저장되고 난 후 응답을 보내도록 async/await으로 비동기 처리
      res.status(200).json(image);
    });

    app.get('/api/images', async (req, res) => {
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
