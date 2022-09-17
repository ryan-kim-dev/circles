const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Types.ObjectId, required: true },
      username: { type: String, required: true },
    },
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
