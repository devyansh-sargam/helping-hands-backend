const Donation = require('../models/Donation.model');
const Request = require('../models/Request.model');
const User = require('../models/User.model');

// @desc    Create new donation
// @route   POST /api/donations
// @access  Public
exports.createDonation = async (req, res, next) => {
  try {
    const {
      amount,
      cause,
      paymentMethod,
      paymentInfo,
      donorName,
      donorEmail,
      isMonthly,
      requestId
    } = req.body;

    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create donation
    const donation = await Donation.create({
      user: req.user ? req.user.id : null,
      request: requestId || null,
      amount,
      cause,
      paymentMethod,
      paymentInfo,
      transactionId,
      status: 'completed', // In production, this would be 'pending' until payment verification
      isMonthly,
      donorName,
      donorEmail
    });

    // Update request if donation is for a specific request
    if (requestId) {
      await Request.findByIdAndUpdate(requestId, {
        $inc: { amountRaised: amount, donorsCount: 1 },
        $push: { donations: donation._id }
      });
    }

    // Update user stats if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { totalDonations: 1, totalDonated: amount }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Public
exports.getAllDonations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.cause) query.cause = req.query.cause;
    if (req.query.paymentMethod) query.paymentMethod = req.query.paymentMethod;

    const donations = await Donation.find(query)
      .populate('user', 'name email')
      .populate('request', 'title category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments(query);

    res.status(200).json({
      success: true,
      count: donations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single donation
// @route   GET /api/donations/:id
// @access  Public
exports.getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('user', 'name email')
      .populate('request', 'title category');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my donations
// @route   GET /api/donations/my/donations
// @access  Private
exports.getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ user: req.user.id })
      .populate('request', 'title category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id/status
// @access  Private/Admin
exports.updateDonationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation status updated',
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private/Admin
exports.deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
