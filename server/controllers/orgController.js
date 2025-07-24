const Organization = require('../models/Organization');
const Team = require('../models/Team');
const User = require('../models/User');

// Create new organization
exports.createOrganization = async (req, res) => {
  const { name, slug } = req.body;
  try {
    const existing = await Organization.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Slug already in use' });

    const org = await Organization.create({ name, slug });

    // Update current user to be part of this org
    await User.findByIdAndUpdate(req.user.id, {
      organizationId: org._id,
      role: 'admin'
    });

    res.status(201).json(org);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current user's org
exports.getMyOrganization = async (req, res) => {
  try {
    const org = await Organization.findById(req.user.organizationId);
    res.json(org);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a team in org
exports.createTeam = async (req, res) => {
  const { name } = req.body;
  try {
    const team = await Team.create({
      name,
      organizationId: req.user.organizationId,
      memberIds: [req.user.id]
    });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get teams in user's org
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({ organizationId: req.user.organizationId }).populate('memberIds', 'name email');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
