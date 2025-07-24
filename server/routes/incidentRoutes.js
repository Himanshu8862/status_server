const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createIncident,
  getIncidents,
  updateIncident,
  resolveIncident
} = require('../controllers/incidentController');

router.use(protect);

router.get('/incidents', getIncidents);
router.post('/incidents', createIncident);
router.put('/incidents/:id', updateIncident);
router.patch('/incidents/:id/resolve', resolveIncident);

module.exports = router;
