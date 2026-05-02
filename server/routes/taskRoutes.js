const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/auth');
const { loadProject, requireProjectAdmin } = require('../middleware/projectAccess');

const router = express.Router();
router.use(protect);

router.post('/', loadProject, requireProjectAdmin, async (req, res) => {
  try {
    const { title, description, project, assignedTo, status, priority, dueDate } = req.body;
    if (!title || title.trim().length < 3) return res.status(400).json({ message: 'Task title must be at least 3 characters' });
    if (!assignedTo || !dueDate) return res.status(400).json({ message: 'Assigned member and due date are required' });
    const isMember = req.project.members.some(m => m.user.toString() === assignedTo);
    if (!isMember) return res.status(400).json({ message: 'Assigned user must be a project member' });
    const task = await Task.create({ title, description, project, assignedTo, createdBy: req.user._id, status, priority, dueDate });
    res.status(201).json(await task.populate('assignedTo', 'name email'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:taskId/status', async (req, res) => {
  const { status } = req.body;
  if (!['Todo', 'In Progress', 'Completed'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const task = await Task.findById(req.params.taskId).populate('project');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const project = task.project;
  const membership = project.members.find(m => m.user.toString() === req.user._id.toString());
  if (!membership) return res.status(403).json({ message: 'Not allowed' });
  if (membership.role !== 'Admin' && task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Members can only update their own tasks' });
  }
  task.status = status;
  await task.save();
  res.json(task);
});

router.delete('/:taskId', async (req, res) => {
  const task = await Task.findById(req.params.taskId).populate('project');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const membership = task.project.members.find(m => m.user.toString() === req.user._id.toString());
  if (!membership || membership.role !== 'Admin') return res.status(403).json({ message: 'Only admins can delete tasks' });
  await task.deleteOne();
  res.json({ message: 'Task deleted' });
});

module.exports = router;
