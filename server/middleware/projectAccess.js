const Project = require('../models/Project');

const loadProject = async (req, res, next) => {
  const projectId = req.params.projectId || req.params.id || req.body.project;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const membership = project.members.find(m => m.user.toString() === req.user._id.toString());
  if (!membership) return res.status(403).json({ message: 'You are not part of this project' });

  req.project = project;
  req.projectRole = membership.role;
  next();
};

const requireProjectAdmin = (req, res, next) => {
  if (req.projectRole !== 'Admin') {
    return res.status(403).json({ message: 'Only project admins can perform this action' });
  }
  next();
};

module.exports = { loadProject, requireProjectAdmin };
