import { text } from "express";
import QuestionSession from "../models/QuestionSession.js"

export const generateQuestion = async (req,res) => {
    const {topic, difficulty } = req.body ;

    try {
        const question = {
            text: `What is 2+2 ?`,
            correctAnswer: '4',
        }

        const session = await QuestionSession.create({
            user: req.user.id,
            topic,
            difficulty,
            questionText: question.text,
            correctAnswer: question.correctAnswer
        });

        res.status(200).json({ sessionId: session._id, question: question.text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const validateAnswer = async (req,res) => {
    const { sessionId, answer } = req.body;

    try {
        const session = await QuestionSession.findById(sessionId);
        if(!session) return res.status(400).json({ message: "session not found "});

        const correct = session.correctAnswer === answer;
        session.answeredCorrectly = correct ;
        session.answeredAt = new Date();
        await session.save();

        res.json({ correct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getSessionStats = async (req, res) => {
  try {
    const sessions = await QuestionSession.find({ user: req.user.id });
    const total = sessions.length;
    const correct = sessions.filter(s => s.answeredCorrectly).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    
    res.json({ total, correct, accuracy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}