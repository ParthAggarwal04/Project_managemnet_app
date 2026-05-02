const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');
const protect = require('../middleware/auth');

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  const projects = await Project.find({ 'members.user': req.user._id }).select('_id');
  const projectIds = projects.map(p => p._id);
  const visibleTasks = await Task.find({ project: { $in: projectIds } }).populate('project', 'name').populate('assignedTo', 'name email');
  const now = new Date();
  const stats = {
    totalProjects: projectIds.length,
    totalTasks: visibleTasks.length,
    todo: visibleTasks.filter(t => t.status === 'Todo').length,
    inProgress: visibleTasks.filter(t => t.status === 'In Progress').length,
    completed: visibleTasks.filter(t => t.status === 'Completed').length,
    overdue: visibleTasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < now).length
  };
  res.json({ stats, tasks: visibleTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 12) });
});

module.exports = router;
