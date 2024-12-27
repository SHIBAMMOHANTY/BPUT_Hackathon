// models/ImpactReport.js
const mongoose = require('mongoose');

// Define the impact report schema
const impactReportSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  impact_description: {
    type: String,
    required: true,
  },
  impact_date: {
    type: Date,
    default: Date.now,
  },
});

const ImpactReport = mongoose.model('ImpactReport', impactReportSchema);

module.exports = ImpactReport;
