import QuestionMeta from '../models/QuestionMeta.js';
export const getUserMeta = async (req, res) => {
  try {
    const userId = req.user?._id || req.params.userId || req.query.userId;
    if (!userId) return res.status(400).json({ message: 'User ID required' });

    const metas = await QuestionMeta.find({ user: userId }).sort({ frequency: -1 });
    res.status(200).json(metas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new meta for a user
export const addUserMeta = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    if (!userId) return res.status(400).json({ message: 'User ID required' });

    const meta = await QuestionMeta.create({ ...req.body, user: userId });
    res.status(201).json(meta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};