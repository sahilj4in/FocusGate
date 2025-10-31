import mongoose from 'mongoose';

const questionMetaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exam: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    format: {
      type: String,
      enum: ['mcq', 'short_answer', 'true_false'],
      default: 'mcq',
    },
    frequency: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const QuestionMeta = mongoose.model('QuestionMeta', questionMetaSchema);
export default QuestionMeta;
