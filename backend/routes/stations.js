const express = require('express');
const Station = require('../models/Station');
const auth = require('../middleware/auth');

const router = express.Router();

// Create station
router.post('/', auth, async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// List stations
router.get('/', auth, async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update station
router.put('/:id', auth, async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Delete station
router.delete('/:id', auth, async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

module.exports = router;
