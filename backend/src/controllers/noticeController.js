import { Notice } from '../models/Notice.js';

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().populate('postedBy', 'name role').sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { title, content, audience } = req.body;

    const notice = await Notice.create({
      title,
      content,
      audience: audience || 'all',
      postedBy: req.user._id
    });

    const populated = await notice.populate('postedBy', 'name role');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();
    res.json({ message: 'Notice removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};