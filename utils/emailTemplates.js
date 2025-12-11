// Email template styles
const emailStyles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1, #ec4899); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; padding: 12px 30px; background: #6366f1; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    .highlight { background: #fff; padding: 15px; border-left: 4px solid #6366f1; margin: 20px 0; }
  </style>
`;

// Welcome email template
exports.welcomeEmail = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 Welcome to Helping Hands!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for joining Helping Hands - a platform where generosity meets those in need.</p>
          
          <div class="highlight">
            <h3>What you can do:</h3>
            <ul>
              <li>✨ Make donations to various causes</li>
              <li>🆘 Create help requests if you need assistance</li>
              <li>📊 Track your donation history</li>
              <li>❤️ Make a real difference in people's lives</li>
            </ul>
          </div>
          
          <p>Every contribution counts, and together we can make the world a better place.</p>
          
          <a href="${process.env.FRONTEND_URL}" class="button">Get Started</a>
          
          <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
          <p>Making a difference, one donation at a time.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Donation receipt email template
exports.donationReceiptEmail = (donorName, amount, cause, transactionId, date) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💝 Thank You for Your Donation!</h1>
        </div>
        <div class="content">
          <h2>Dear ${donorName},</h2>
          <p>Thank you for your generous donation to Helping Hands. Your contribution will make a real difference!</p>
          
          <div class="highlight">
            <h3>Donation Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Amount:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Cause:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${cause}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Transaction ID:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${transactionId}</td>
              </tr>
              <tr>
                <td style="padding: 10px;"><strong>Date:</strong></td>
                <td style="padding: 10px;">${date}</td>
              </tr>
            </table>
          </div>
          
          <p>This email serves as your official receipt. Please keep it for your records.</p>
          
          <a href="${process.env.FRONTEND_URL}/donations" class="button">View My Donations</a>
          
          <p><strong>Your impact:</strong> Your donation will help provide essential support to those in need. Thank you for being a part of our mission!</p>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
          <p>Questions? Contact us at support@helpinghands.org</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Request submission confirmation email
exports.requestSubmittedEmail = (requesterName, title, amountNeeded) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📝 Request Submitted Successfully</h1>
        </div>
        <div class="content">
          <h2>Hello ${requesterName},</h2>
          <p>Your help request has been successfully submitted to Helping Hands.</p>
          
          <div class="highlight">
            <h3>Request Details:</h3>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Amount Needed:</strong> ₹${amountNeeded.toLocaleString()}</p>
            <p><strong>Status:</strong> Pending Review</p>
          </div>
          
          <p>Our team will review your request within 24-48 hours. You will receive an email notification once your request is approved.</p>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will verify the details you provided</li>
            <li>Once approved, your request will be visible to donors</li>
            <li>You'll receive notifications when donations are made</li>
          </ul>
          
          <a href="${process.env.FRONTEND_URL}/my-requests" class="button">View My Requests</a>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Request approved email
exports.requestApprovedEmail = (requesterName, title) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Request Approved!</h1>
        </div>
        <div class="content">
          <h2>Great News, ${requesterName}!</h2>
          <p>Your help request "<strong>${title}</strong>" has been approved and is now live on Helping Hands.</p>
          
          <div class="highlight">
            <p>Your request is now visible to all donors on our platform. You can start receiving donations immediately!</p>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Share your request link with friends and family</li>
            <li>Track donations in real-time from your dashboard</li>
            <li>Keep your request updated with progress</li>
          </ul>
          
          <a href="${process.env.FRONTEND_URL}/my-requests" class="button">View My Request</a>
          
          <p>Thank you for trusting Helping Hands. We hope you receive the support you need!</p>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Password reset email
exports.passwordResetEmail = (name, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>You requested to reset your password for your Helping Hands account.</p>
          
          <div class="highlight">
            <p>Click the button below to reset your password. This link will expire in 10 minutes.</p>
          </div>
          
          <a href="${resetUrl}" class="button">Reset Password</a>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6366f1;">${resetUrl}</p>
          
          <p><strong>Didn't request this?</strong> You can safely ignore this email. Your password will not be changed.</p>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
          <p>For security reasons, never share this email with anyone.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email verification template
exports.emailVerificationEmail = (name, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Verify Your Email</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for registering with Helping Hands! Please verify your email address to complete your registration.</p>
          
          <div class="highlight">
            <p>Click the button below to verify your email address:</p>
          </div>
          
          <a href="${verificationUrl}" class="button">Verify Email</a>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6366f1;">${verificationUrl}</p>
          
          <p>This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Monthly donation reminder
exports.monthlyDonationReminder = (donorName, amount, cause) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💝 Monthly Donation Reminder</h1>
        </div>
        <div class="content">
          <h2>Hello ${donorName},</h2>
          <p>This is a friendly reminder about your monthly donation to Helping Hands.</p>
          
          <div class="highlight">
            <h3>Your Monthly Contribution:</h3>
            <p><strong>Amount:</strong> ₹${amount.toLocaleString()}</p>
            <p><strong>Cause:</strong> ${cause}</p>
          </div>
          
          <p>Your recurring donation will be processed automatically. Thank you for your continued support!</p>
          
          <p><strong>Your Impact:</strong> Your monthly donations help us provide consistent support to those in need.</p>
          
          <a href="${process.env.FRONTEND_URL}/donations" class="button">Manage Donations</a>
          
          <p>To cancel or modify your monthly donation, please visit your account settings.</p>
        </div>
        <div class="footer">
          <p>© 2024 Helping Hands. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
