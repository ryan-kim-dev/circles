const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid'); // 버젼 4 사용
const mime = require('mime-types');

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

app.use('/uploads', express.static('uploads')); // 클라이언트에서 서버의 정적 파일에 접근할 수 있도록

app.post('/upload', upload.single('image'), (req, res) => {
  // req.file: 요청 메세지에 담긴 파일의 정보
  console.log(req.file);
  res.json(req.file);
});
app.listen(PORT, () => console.log(`${PORT}번 포트로 서버 실행중`));

// uuid: 유저가 업로드한 파일에 고유한 uuid를 부여하기 위해 사용
// mime-types: jpeg 포맷으로 넘어오지 않고 있기 때문에 이를 특정 포맷으로 바꿔 저장하기 위해 사용
// multer 미들웨어: 이미지 업로드 request에서 이미지를 뽑아와서 uploads 폴더에 저장해준다.
// 미들웨어: 요청이 오고 해당 요청에 대한 어떠한 작업을 거쳐서 응답으로 보낼 수 있게 중간에서 실행되는 것들
// 이미지는 요청 메시지 body에서 form-data 형식이다.(키-값 쌍) Key: text or file
