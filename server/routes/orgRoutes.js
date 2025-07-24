const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createOrganization,
  getMyOrganization,
  createTeam,
  getTeams
} = require('../controllers/orgController');

router.post('/org', protect, createOrganization);
router.get('/org', protect, getMyOrganization);

router.post('/teams', protect, createTeam);
router.get('/teams', protect, getTeams);

module.exports = router;
