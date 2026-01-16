/**
 * Reset Donations Script
 * 
 * This script will:
 * 1. Delete all donations from the database
 * 2. Reset all user donation stats (totalDonations, totalDonated)
 * 3. Reset all request amounts (amountRaised, donorsCount)
 * 
 * Usage: node scripts/resetDonations.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const Donation = require('../models/Donation.model');
const User = require('../models/User.model');
const Request = require('../models/Request.model');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.magenta}${'='.repeat(60)}${colors.reset}\n${colors.cyan}${msg}${colors.reset}\n${colors.magenta}${'='.repeat(60)}${colors.reset}\n`)
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.success('Connected to MongoDB');
  } catch (error) {
    log.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// Reset donations
const resetDonations = async () => {
  try {
    log.header('DONATION RESET SCRIPT');
    
    // Get counts before deletion
    const donationCount = await Donation.countDocuments();
    const userCount = await User.countDocuments();
    const requestCount = await Request.countDocuments();
    
    log.info(`Found ${donationCount} donations to delete`);
    log.info(`Found ${userCount} users to reset`);
    log.info(`Found ${requestCount} requests to reset`);
    
    if (donationCount === 0) {
      log.warning('No donations found in database');
      return;
    }
    
    // Confirm deletion
    console.log('\n');
    log.warning('⚠️  WARNING: This will permanently delete all donations!');
    log.warning('⚠️  This action cannot be undone!');
    console.log('\n');
    
    // In production, you might want to add a confirmation prompt here
    // For now, we'll proceed automatically
    
    log.info('Starting reset process...\n');
    
    // Step 1: Delete all donations
    log.info('Step 1: Deleting all donations...');
    const deletedDonations = await Donation.deleteMany({});
    log.success(`Deleted ${deletedDonations.deletedCount} donations`);
    
    // Step 2: Reset user stats
    log.info('Step 2: Resetting user donation stats...');
    const updatedUsers = await User.updateMany(
      {},
      {
        $set: {
          totalDonations: 0,
          totalDonated: 0
        }
      }
    );
    log.success(`Reset stats for ${updatedUsers.modifiedCount} users`);
    
    // Step 3: Reset request amounts
    log.info('Step 3: Resetting request amounts...');
    const updatedRequests = await Request.updateMany(
      {},
      {
        $set: {
          amountRaised: 0,
          donorsCount: 0,
          donations: []
        }
      }
    );
    log.success(`Reset amounts for ${updatedRequests.modifiedCount} requests`);
    
    // Summary
    console.log('\n');
    log.header('RESET COMPLETE');
    log.success(`✓ Deleted ${deletedDonations.deletedCount} donations`);
    log.success(`✓ Reset ${updatedUsers.modifiedCount} user accounts`);
    log.success(`✓ Reset ${updatedRequests.modifiedCount} help requests`);
    console.log('\n');
    log.info('Database has been reset successfully!');
    log.info('All donation data has been cleared.');
    console.log('\n');
    
  } catch (error) {
    log.error(`Error during reset: ${error.message}`);
    throw error;
  }
};

// Main execution
const main = async () => {
  try {
    await connectDB();
    await resetDonations();
    
    // Close connection
    await mongoose.connection.close();
    log.success('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    log.error(`Script failed: ${error.message}`);
    process.exit(1);
  }
};

// Run the script
main();
