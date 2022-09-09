const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  {
    // 작성, 수정시간 저장
    timestamps: true,
  }
);

const Image = mongoose.model('Image', ImageSchema);
module.exports = { Image };
