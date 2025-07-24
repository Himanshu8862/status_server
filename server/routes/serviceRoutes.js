const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createService,
  getServices,
  updateService,
  deleteService
} = require('../controllers/serviceController');

router.use(protect); // all routes require auth

router.get('/services', getServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;