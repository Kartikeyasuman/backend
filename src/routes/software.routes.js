const express = require('express');
const router = express.Router();
const { createSoftware, getAllSoftware } = require('../controllers/software.controller');

// ✅ This is the working version
router.post('/', createSoftware);
router.get('/', getAllSoftware); // 👈 Yeh line par galti hai tumhare code me most likely

module.exports = router;
