import { Resource } from '../models/Resource.js';

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('uploadedBy', 'name email role').sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const { title, type, subject, fileUrl, size } = req.body;

    const resource = await Resource.create({
      title,
      type,
      subject,
      fileUrl: fileUrl || 'https://example.com/mock-file.pdf',
      size: size || '3.2 MB',
      uploadedBy: req.user._id
    });

    const populated = await resource.populate('uploadedBy', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this resource' });
    }

    await resource.deleteOne();
    res.json({ message: 'Resource removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};