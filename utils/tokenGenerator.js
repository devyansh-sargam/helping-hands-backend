const crypto = require('crypto');

// Generate random token
exports.generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate verification token
exports.generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Hash token for storage
exports.hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
