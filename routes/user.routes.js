const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserDonations,
  getUserRequests
} = require('../controllers/user.controller');

// All routes are protected and require admin role
router.use(protect);

// User routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

// User-specific data
router.get('/:id/donations', getUserDonations);
router.get('/:id/requests', getUserRequests);

module.exports = router;
