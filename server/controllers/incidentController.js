const Incident = require('../models/Incident');

exports.createIncident = async (req, res) => {
  const { title, type, services, impact, scheduledFor, updates } = req.body;
  try {
    const incident = await Incident.create({
      title,
      type,
      impact,
      services,
      scheduledFor,
      updates: updates || [],
      organizationId: req.user.organizationId
    });
    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ organizationId: req.user.organizationId })
      .populate('services', 'name status')
      .sort({ createdAt: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateIncident = async (req, res) => {
  const { id } = req.params;
  const { status, updateMessage } = req.body;

  try {
    const incident = await Incident.findOneAndUpdate(
      { _id: id, organizationId: req.user.organizationId },
      {
        status,
        $push: {
          updates: {
            message: updateMessage,
            status,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resolveIncident = async (req, res) => {
  const { id } = req.params;
  try {
    const incident = await Incident.findOneAndUpdate(
      { _id: id, organizationId: req.user.organizationId },
      {
        status: 'resolved',
        $push: {
          updates: {
            message: 'Incident resolved.',
            status: 'resolved',
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
