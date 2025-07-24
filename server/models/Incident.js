const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['incident', 'maintenance'], default: 'incident' },
  status: {
    type: String,
    enum: ['investigating', 'identified', 'monitoring', 'resolved'],
    default: 'investigating'
  },
  impact: {
    type: String,
    enum: ['none', 'minor', 'major'],
    default: 'minor'
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  updates: [
    {
      message: String,
      status: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  scheduledFor: Date, // for scheduled maintenances
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);
