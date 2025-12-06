const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    default: null
  },
  amount: {
    type: Number,
    required: [true, 'Please provide donation amount'],
    min: [100, 'Minimum donation amount is ₹100']
  },
  cause: {
    type: String,
    required: [true, 'Please specify the cause'],
    enum: ['medical', 'education', 'food', 'shelter', 'clothing', 'elderly', 'general']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please specify payment method'],
    enum: ['card', 'upi', 'netbanking', 'wallet']
  },
  paymentInfo: {
    type: String,
    default: null
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  razorpayOrderId: {
    type: String,
    default: null
  },
  razorpayPaymentId: {
    type: String,
    default: null
  },
  razorpaySignature: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  isMonthly: {
    type: Boolean,
    default: false
  },
  donorName: {
    type: String,
    required: true
  },
  donorEmail: {
    type: String,
    required: true
  },
  receiptSent: {
    type: Boolean,
    default: false
  },
  receiptUrl: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
donationSchema.index({ user: 1, createdAt: -1 });
donationSchema.index({ status: 1 });
donationSchema.index({ cause: 1 });

// Update timestamps
donationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
