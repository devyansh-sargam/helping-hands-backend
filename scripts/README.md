# 🛠️ Database Scripts

Utility scripts for managing the Helping Hands database.

## 📋 Available Scripts

### 1. Reset Donations (`resetDonations.js`)

**Purpose**: Completely reset all donation data in the database.

**What it does**:
- ✅ Deletes all donations
- ✅ Resets user donation stats (totalDonations, totalDonated)
- ✅ Resets request amounts (amountRaised, donorsCount)
- ✅ Clears donation references from requests

**Usage**:
```bash
cd backend
node scripts/resetDonations.js
```

**Output**:
```
============================================================
DONATION RESET SCRIPT
============================================================

ℹ Found 150 donations to delete
ℹ Found 45 users to reset
ℹ Found 30 requests to reset

⚠ WARNING: This will permanently delete all donations!
⚠ This action cannot be undone!

ℹ Starting reset process...

ℹ Step 1: Deleting all donations...
✓ Deleted 150 donations

ℹ Step 2: Resetting user donation stats...
✓ Reset stats for 45 users

ℹ Step 3: Resetting request amounts...
✓ Reset amounts for 30 requests

============================================================
RESET COMPLETE
============================================================

✓ Deleted 150 donations
✓ Reset 45 user accounts
✓ Reset 30 help requests

ℹ Database has been reset successfully!
```

**When to use**:
- Testing payment integration
- Clearing test data
- Starting fresh with production data
- Development/staging environment resets

---

### 2. Update Locations (`updateLocations.js`)

**Purpose**: Update all request locations to Bhopal, Madhya Pradesh.

**What it does**:
- ✅ Updates all existing requests
- ✅ Sets city to "Bhopal"
- ✅ Sets state to "Madhya Pradesh"
- ✅ Sets country to "India"

**Usage**:
```bash
cd backend
node scripts/updateLocations.js
```

**Output**:
```
============================================================
LOCATION UPDATE SCRIPT
============================================================

ℹ Found 30 requests to update
ℹ Updating all request locations to Bhopal, Madhya Pradesh...
✓ Updated 30 requests

ℹ Sample request location:
  City: Bhopal
  State: Madhya Pradesh
  Country: India

============================================================
UPDATE COMPLETE
============================================================

✓ Updated 30 requests
✓ All locations set to: Bhopal, Madhya Pradesh, India
```

**When to use**:
- Changing default location
- Bulk updating existing data
- Migration after location changes

---

## 🔧 Setup

### Prerequisites

1. **Environment Variables**: Ensure `.env` file is configured
```env
MONGODB_URI=your_mongodb_connection_string
```

2. **Dependencies**: Install required packages
```bash
cd backend
npm install
```

3. **Database Access**: Ensure MongoDB is accessible

---

## ⚠️ Important Notes

### Safety

- **Backup First**: Always backup your database before running scripts
- **Test Environment**: Test scripts in development before production
- **Irreversible**: Deletion operations cannot be undone
- **Confirmation**: Scripts run automatically without confirmation prompts

### MongoDB Backup

Before running reset scripts:

```bash
# Backup entire database
mongodump --uri="your_mongodb_uri" --out=./backup

# Restore if needed
mongorestore --uri="your_mongodb_uri" ./backup
```

---

## 🚀 Running Scripts

### Development Environment

```bash
# Set environment to development
export NODE_ENV=development

# Run script
node scripts/resetDonations.js
```

### Production Environment

```bash
# CAUTION: Only run in production if you're sure!
export NODE_ENV=production

# Run script with extra caution
node scripts/resetDonations.js
```

---

## 📊 Script Details

### Reset Donations Script

**File**: `scripts/resetDonations.js`

**Operations**:
1. Connects to MongoDB
2. Counts existing records
3. Deletes all donations
4. Updates user stats to zero
5. Updates request amounts to zero
6. Displays summary
7. Closes connection

**Models Affected**:
- `Donation` - All records deleted
- `User` - Stats reset
- `Request` - Amounts reset

**Time**: ~5-10 seconds for 1000 records

---

### Update Locations Script

**File**: `scripts/updateLocations.js`

**Operations**:
1. Connects to MongoDB
2. Counts existing requests
3. Updates all location fields
4. Verifies update with sample
5. Displays summary
6. Closes connection

**Models Affected**:
- `Request` - Location fields updated

**Time**: ~2-5 seconds for 1000 records

---

## 🐛 Troubleshooting

### Connection Error

```
✗ MongoDB connection error: ...
```

**Solution**: Check `MONGODB_URI` in `.env` file

### No Records Found

```
⚠ No donations found in database
```

**Solution**: Database is already empty or connection issue

### Permission Error

```
✗ Error during reset: ...
```

**Solution**: Check MongoDB user permissions

---

## 📝 Creating New Scripts

Template for new database scripts:

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const YourModel = require('../models/YourModel.model');

// Connect to DB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

// Your script logic
const yourScript = async () => {
  try {
    // Your operations here
    console.log('Script completed');
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Main execution
const main = async () => {
  try {
    await connectDB();
    await yourScript();
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Script failed:', error.message);
    process.exit(1);
  }
};

main();
```

---

## ✅ Best Practices

1. **Always backup** before running destructive operations
2. **Test first** in development environment
3. **Review output** to verify operations
4. **Document changes** in commit messages
5. **Use version control** for script changes
6. **Add logging** for debugging
7. **Handle errors** gracefully
8. **Close connections** properly

---

## 📞 Support

If you encounter issues:
1. Check MongoDB connection
2. Verify environment variables
3. Review script output
4. Check database permissions
5. Create an issue on GitHub

---

**Last Updated**: December 14, 2024
