const User = require('../models/User.model');
const Donation = require('../models/Donation.model');
const Request = require('../models/Request.model');

// @desc    Get overall statistics
// @route   GET /api/stats/overall
// @access  Public
exports.getOverallStats = async (req, res, next) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total donations
    const totalDonations = await Donation.countDocuments({ status: 'completed' });

    // Total amount raised
    const donationStats = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          avgDonation: { $avg: '$amount' }
        }
      }
    ]);

    // Total requests
    const totalRequests = await Request.countDocuments();
    const activeRequests = await Request.countDocuments({ status: { $in: ['approved', 'active'] } });
    const completedRequests = await Request.countDocuments({ status: 'completed' });

    // People helped (unique donors)
    const peopleHelped = await Request.aggregate([
      { $match: { status: { $in: ['active', 'completed'] } } },
      { $group: { _id: null, count: { $sum: '$donorsCount' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDonations,
        totalAmountRaised: donationStats[0]?.totalAmount || 0,
        averageDonation: Math.round(donationStats[0]?.avgDonation || 0),
        totalRequests,
        activeRequests,
        completedRequests,
        peopleHelped: peopleHelped[0]?.count || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donation statistics
// @route   GET /api/stats/donations
// @access  Public
exports.getDonationStats = async (req, res, next) => {
  try {
    // Donations by cause
    const byCause = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$cause',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    // Donations by payment method
    const byPaymentMethod = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Monthly donations (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyDonations = await Donation.aggregate([
      { 
        $match: { 
          status: 'completed',
          createdAt: { $gte: sixMonthsAgo }
        } 
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Top donors
    const topDonors = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$donorEmail',
          name: { $first: '$donorName' },
          totalDonated: { $sum: '$amount' },
          donationCount: { $sum: 1 }
        }
      },
      { $sort: { totalDonated: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        byCause,
        byPaymentMethod,
        monthlyDonations,
        topDonors
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get request statistics
// @route   GET /api/stats/requests
// @access  Public
exports.getRequestStats = async (req, res, next) => {
  try {
    // Requests by category
    const byCategory = await Request.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalNeeded: { $sum: '$amountNeeded' },
          totalRaised: { $sum: '$amountRaised' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Requests by status
    const byStatus = await Request.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Requests by urgency
    const byUrgency = await Request.aggregate([
      {
        $group: {
          _id: '$urgency',
          count: { $sum: 1 }
        }
      }
    ]);

    // Most funded requests
    const mostFunded = await Request.find()
      .select('title category amountNeeded amountRaised donorsCount')
      .sort({ amountRaised: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        byCategory,
        byStatus,
        byUrgency,
        mostFunded
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics
// @route   GET /api/stats/users
// @access  Public
exports.getUserStats = async (req, res, next) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Users by role
    const byRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // New users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Top contributors
    const topContributors = await User.find()
      .select('name email totalDonations totalDonated')
      .sort({ totalDonated: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        byRole,
        newUsers,
        topContributors
      }
    });
  } catch (error) {
    next(error);
  }
};
