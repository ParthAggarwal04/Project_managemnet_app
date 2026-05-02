const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const protect = require('../middleware/auth');
const { loadProject, requireProjectAdmin } = require('../middleware/projectAccess');

const router = express.Router();
router.use(protect);

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || name.trim().length < 3) return res.status(400).json({ message: 'Project name must be at least 3 characters' });
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'Admin' }]
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  const projects = await Project.find({ 'members.user': req.user._id })
    .populate('owner', 'name email')
    .populate('members.user', 'name email')
    .sort({ createdAt: -1 });
  res.json(projects);
});

router.get('/:id', loadProject, async (req, res) => {
  const project = await Project.findById(req.project._id).populate('members.user', 'name email');
  const tasks = await Task.find({ project: req.project._id }).populate('assignedTo', 'name email').sort({ dueDate: 1 });
  res.json({ project, tasks, role: req.projectRole });
});

router.post('/:id/members', loadProject, requireProjectAdmin, async (req, res) => {
  const { email, role } = req.body;
  if (!email) return res.status(400).json({ message: 'Member email is required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User must signup first' });
  if (req.project.members.some(m => m.user.toString() === user._id.toString())) {
    return res.status(409).json({ message: 'User is already in this project' });
  }
  req.project.members.push({ user: user._id, role: role === 'Admin' ? 'Admin' : 'Member' });
  await req.project.save();
  res.json(await req.project.populate('members.user', 'name email'));
});

module.exports = router;
