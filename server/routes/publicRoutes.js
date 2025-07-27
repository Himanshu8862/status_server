const express = require('express');
const router = express.Router();
const { getPublicStatus } = require('../controllers/publicController');

router.get('/public/:slug/status', getPublicStatus);

module.exports = router;