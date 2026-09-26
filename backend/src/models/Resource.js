import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['PDF', 'Video', 'Book', 'Link'], required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true },
    size: { type: String, default: 'N/A' },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export const Resource = mongoose.model('Resource', resourceSchema);