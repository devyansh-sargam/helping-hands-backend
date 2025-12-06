const Request = require('../models/Request.model');

// @desc    Create new request
// @route   POST /api/requests
// @access  Private
exports.createRequest = async (req, res, next) => {
  try {
    const requestData = {
      ...req.body,
      user: req.user.id
    };

    const request = await Request.create(requestData);

    res.status(201).json({
      success: true,
      message: 'Request created successfully. It will be reviewed by our team.',
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
exports.getAllRequests = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    
    // Filter by status (default to approved/active for public)
    if (req.query.status) {
      query.status = req.query.status;
    } else {
      query.status = { $in: ['approved', 'active'] };
    }
    
    if (req.query.category) query.category = req.query.category;
    if (req.query.urgency) query.urgency = req.query.urgency;

    const requests = await Request.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Request.countDocuments(query);

    res.status(200).json({
      success: true,
      count: requests.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Public
exports.getRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'donations',
        select: 'amount donorName createdAt',
        options: { sort: { createdAt: -1 }, limit: 10 }
      });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Increment views
    request.views += 1;
    await request.save();

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my requests
// @route   GET /api/requests/my/requests
// @access  Private
exports.getMyRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request
// @route   PUT /api/requests/:id
// @access  Private
exports.updateRequest = async (req, res, next) => {
  try {
    let request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check ownership
    if (request.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this request'
      });
    }

    request = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Request updated successfully',
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete request
// @route   DELETE /api/requests/:id
// @access  Private
exports.deleteRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check ownership
    if (request.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this request'
      });
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve request
// @route   PUT /api/requests/:id/approve
// @access  Private/Admin
exports.approveRequest = async (req, res, next) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'approved',
        verificationStatus: 'verified'
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Request approved successfully',
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject request
// @route   PUT /api/requests/:id/reject
// @access  Private/Admin
exports.rejectRequest = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        verificationStatus: 'rejected',
        adminNotes: reason
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Request rejected',
      data: request
    });
  } catch (error) {
    next(error);
  }
};
