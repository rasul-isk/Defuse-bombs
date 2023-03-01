import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    difficulty: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model('scores', scoreSchema);

export default Score;
