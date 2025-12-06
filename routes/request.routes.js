const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  createRequest,
  getAllRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  approveRequest,
  rejectRequest,
  getMyRequests
} = require('../controllers/request.controller');

// Validation rules
const requestValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category').isIn(['medical', 'education', 'food', 'shelter', 'clothing', 'other']).withMessage('Invalid category'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('amountNeeded').isNumeric().isInt({ min: 1000 }).withMessage('Minimum amount is ₹1000'),
  body('requesterName').trim().notEmpty().withMessage('Name is required'),
  body('requesterEmail').isEmail().withMessage('Valid email is required'),
  body('requesterPhone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number is required'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.state').trim().notEmpty().withMessage('State is required')
];

// Public routes
router.get('/', getAllRequests);
router.get('/:id', getRequest);

// Protected routes
router.post('/', protect, requestValidation, validate, createRequest);
router.get('/my/requests', protect, getMyRequests);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

// Admin routes
router.put('/:id/approve', protect, authorize('admin'), approveRequest);
router.put('/:id/reject', protect, authorize('admin'), rejectRequest);

module.exports = router;
