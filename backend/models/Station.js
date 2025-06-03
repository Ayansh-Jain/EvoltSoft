const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, required: true },
  powerOutput: { type: Number, required: true },
  connectorType: { type: String, required: true }
});

module.exports = mongoose.model('Station', stationSchema);
