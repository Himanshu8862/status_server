const Service = require('../models/Service');
const { io } = require('../server');

// Create a new service
exports.createService = async (req, res) => {
  const { name, description } = req.body;
  try {
    const service = await Service.create({
      name,
      description,
      organizationId: req.user.organizationId
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all services in the org
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ organizationId: req.user.organizationId });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update service status or details
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const updated = await Service.findOneAndUpdate(
      { _id: id, organizationId: req.user.organizationId },
      { name, description, status },
      { new: true }
    );

    // Emit to clients in the org
    const Organization = require('../models/Organization');
    const org = await Organization.findById(req.user.organizationId);
    io.emitStatusUpdate(org.slug, {
      type: 'service-update',
      service: updated
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await Service.findOneAndDelete({ _id: id, organizationId: req.user.organizationId });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
