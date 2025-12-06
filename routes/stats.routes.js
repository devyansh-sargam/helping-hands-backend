const express = require('express');
const router = express.Router();
const {
  getOverallStats,
  getDonationStats,
  getRequestStats,
  getUserStats
} = require('../controllers/stats.controller');

// Public routes
router.get('/overall', getOverallStats);
router.get('/donations', getDonationStats);
router.get('/requests', getRequestStats);
router.get('/users', getUserStats);

module.exports = router;
