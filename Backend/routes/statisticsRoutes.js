const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// Route to get statistics data for a specific user
router.get('/:userId', statisticsController.getUserStatistics);

module.exports = router;
