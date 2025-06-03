require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/stations');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use('/auth', authRoutes);
app.use('/stations', stationRoutes);
app.get('/', (req, res) => {
  res.send('EvoltSoft backend is running!');
});
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
