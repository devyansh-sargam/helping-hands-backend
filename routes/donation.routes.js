const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  createDonation,
  getAllDonations,
  getDonation,
  updateDonationStatus,
  deleteDonation,
  getMyDonations
} = require('../controllers/donation.controller');

// Validation rules
const donationValidation = [
  body('amount').isNumeric().isInt({ min: 100 }).withMessage('Minimum donation amount is ₹100'),
  body('cause').isIn(['medical', 'education', 'food', 'shelter', 'clothing', 'elderly', 'general']).withMessage('Invalid cause'),
  body('paymentMethod').isIn(['card', 'upi', 'netbanking', 'wallet']).withMessage('Invalid payment method'),
  body('donorName').trim().notEmpty().withMessage('Donor name is required'),
  body('donorEmail').isEmail().withMessage('Valid email is required')
];

// Public routes
router.post('/', donationValidation, validate, createDonation);
router.get('/', getAllDonations);
router.get('/:id', getDonation);

// Protected routes
router.get('/my/donations', protect, getMyDonations);
router.put('/:id/status', protect, authorize('admin'), updateDonationStatus);
router.delete('/:id', protect, authorize('admin'), deleteDonation);

module.exports = router;
