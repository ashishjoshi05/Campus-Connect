import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    audience: {
      type: String,
      enum: ['all', 'student', 'faculty'],
      default: 'all'
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export const Notice = mongoose.model('Notice', noticeSchema);