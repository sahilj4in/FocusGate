import axios from "axios";

export const generateQuestion = async (req, res) => {
  const { exam, topic, difficulty, format = "MCQ", frequency } = req.body;

  try {
    const systemPrompt = `
You are an AI academic assistant. When given inputs like exam, topic, difficulty, and format, you must return exactly ONE well-structured academic question, suitable for a quiz or test.

⚠️ FORMAT REQUIREMENT:
You MUST respond ONLY in the following strict JSON format:

{
  "question": "Your generated question here?",
  "correctAnswer": "Correct answer here"
}

💡 Notes:
- Make sure the question matches the format type: "${format}".
- Make it precise, relevant to "${exam}" and topic "${topic}".
- Difficulty should match level "${difficulty}".
- No extra explanations or markdown. Only raw JSON.
`;

    const userPrompt = `
Generate one academic question with:
- Exam: ${exam}
- Topic: ${topic}
- Difficulty: ${difficulty}
- Format: ${format}
`;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-405b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Set your API key in env
          "Content-Type": "application/json",
        },
      }
    );

    const responseText = aiResponse.data.choices[0]?.message?.content?.trim();

    // Simple parser to extract the first JSON block
    const extractJSON = (text) => {
      const match = text.match(/\{[\s\S]*?\}/);
      if (!match) throw new Error("AI response does not contain valid JSON.");
      return JSON.parse(match[0]);
    };

    const parsed = extractJSON(responseText);

    res.status(200).json({
      question: parsed.question,
      correctAnswer: parsed.correctAnswer,
      rawResponse: responseText,
    });
  } catch (err) {
    console.error("AI Question Gen Error:", err.message || err);
    res.status(500).json({ error: "Failed to generate or parse question." });
  }
};


export const validateAnswer = async (req, res) => {
  const { sessionId, answer } = req.body;

  try {
    const session = await QuestionSession.findById(sessionId);
    if (!session)
      return res.status(400).json({ message: "session not found " });

    const correct = session.correctAnswer === answer;
    session.answeredCorrectly = correct;
    session.answeredAt = new Date();
    await session.save();

    res.json({ correct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSessionStats = async (req, res) => {
  try {
    const sessions = await QuestionSession.find({ user: req.user.id });
    const total = sessions.length;
    const correct = sessions.filter((s) => s.answeredCorrectly).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    res.json({ total, correct, accuracy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
