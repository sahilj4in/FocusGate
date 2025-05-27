import mongoose from 'mongoose';

const questionSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String },
    difficulty: { type: String },
    questionText: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    answeredCorrectly: { type: Boolean, default: null },
    answeredAt: { type: Date },
  },
  { timestamps: true }
);

const QuestionSession = mongoose.model('QuestionSession', questionSessionSchema);

export default QuestionSession;
