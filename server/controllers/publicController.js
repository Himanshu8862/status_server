const Organization = require('../models/Organization');
const Service = require('../models/Service');
const Incident = require('../models/Incident');

exports.getPublicStatus = async (req, res) => {
  const { slug } = req.params;

  try {
    const org = await Organization.findOne({ slug });
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const services = await Service.find({ organizationId: org._id });

    const incidents = await Incident.find({
      organizationId: org._id,
      status: { $ne: 'resolved' }
    }).populate('services', 'name status');

    const recent = await Incident.find({
      organizationId: org._id
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      organization: {
        name: org.name,
        slug: org.slug
      },
      services,
      activeIncidents: incidents,
      timeline: recent
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
