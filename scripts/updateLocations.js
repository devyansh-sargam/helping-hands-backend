/**
 * Update Locations Script
 * 
 * This script will update all existing requests to have Bhopal as the location
 * 
 * Usage: node scripts/updateLocations.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
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

// Update locations
const updateLocations = async () => {
  try {
    log.header('LOCATION UPDATE SCRIPT');
    
    // Get count of requests
    const requestCount = await Request.countDocuments();
    log.info(`Found ${requestCount} requests to update`);
    
    if (requestCount === 0) {
      log.warning('No requests found in database');
      return;
    }
    
    // Update all requests to Bhopal location
    log.info('Updating all request locations to Bhopal, Madhya Pradesh...');
    
    const result = await Request.updateMany(
      {},
      {
        $set: {
          'location.city': 'Bhopal',
          'location.state': 'Madhya Pradesh',
          'location.country': 'India'
        }
      }
    );
    
    log.success(`Updated ${result.modifiedCount} requests`);
    
    // Verify the update
    const sampleRequest = await Request.findOne();
    if (sampleRequest) {
      console.log('\n');
      log.info('Sample request location:');
      console.log(`  City: ${sampleRequest.location.city}`);
      console.log(`  State: ${sampleRequest.location.state}`);
      console.log(`  Country: ${sampleRequest.location.country}`);
    }
    
    // Summary
    console.log('\n');
    log.header('UPDATE COMPLETE');
    log.success(`✓ Updated ${result.modifiedCount} requests`);
    log.success(`✓ All locations set to: Bhopal, Madhya Pradesh, India`);
    console.log('\n');
    
  } catch (error) {
    log.error(`Error during update: ${error.message}`);
    throw error;
  }
};

// Main execution
const main = async () => {
  try {
    await connectDB();
    await updateLocations();
    
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
