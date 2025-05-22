const express = require('express');
const router = express.Router();

const {
  createRequest,
  getAllRequests,
  updateRequestStatus
} = require('../controllers/request.controller');

const authMiddleware = require('../middlewares/auth.middleware');

// Employee creates a request
router.post('/', authMiddleware, createRequest);

// Manager fetches all pending requests
router.get('/', authMiddleware, getAllRequests);

// Manager approves or rejects a request ✅
router.patch('/:id', authMiddleware, updateRequestStatus);

module.exports = router;
