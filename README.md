# Helping Hands Backend API

Complete backend API for the Helping Hands donation platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete CRUD operations for users
- **Donation System**: Handle donations with multiple payment methods
- **Request Management**: Create and manage help requests
- **Statistics & Analytics**: Comprehensive stats for donations, requests, and users
- **Security**: Helmet, rate limiting, XSS protection, NoSQL injection prevention
- **Validation**: Input validation using express-validator
- **Error Handling**: Centralized error handling middleware

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/devyansh-sargam/helping-hands-backend.git
cd helping-hands-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. **Start the server**
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/change-password` - Change password (Protected)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/:id/donations` - Get user donations (Protected)
- `GET /api/users/:id/requests` - Get user requests (Protected)

### Donations
- `POST /api/donations` - Create donation (Public)
- `GET /api/donations` - Get all donations (Public)
- `GET /api/donations/:id` - Get single donation (Public)
- `GET /api/donations/my/donations` - Get my donations (Protected)
- `PUT /api/donations/:id/status` - Update donation status (Admin)
- `DELETE /api/donations/:id` - Delete donation (Admin)

### Requests
- `POST /api/requests` - Create request (Protected)
- `GET /api/requests` - Get all requests (Public)
- `GET /api/requests/:id` - Get single request (Public)
- `GET /api/requests/my/requests` - Get my requests (Protected)
- `PUT /api/requests/:id` - Update request (Protected)
- `DELETE /api/requests/:id` - Delete request (Protected)
- `PUT /api/requests/:id/approve` - Approve request (Admin)
- `PUT /api/requests/:id/reject` - Reject request (Admin)

### Statistics
- `GET /api/stats/overall` - Get overall statistics
- `GET /api/stats/donations` - Get donation statistics
- `GET /api/stats/requests` - Get request statistics
- `GET /api/stats/users` - Get user statistics

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers for security
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configured for specific frontend origin
- **XSS Protection**: Sanitizes user input
- **NoSQL Injection Prevention**: Sanitizes MongoDB queries
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds

## 📦 Database Models

### User Model
- name, email, phone, password
- role (user/admin)
- totalDonations, totalDonated
- timestamps

### Donation Model
- user, request, amount, cause
- paymentMethod, transactionId
- status, isMonthly
- donorName, donorEmail
- timestamps

### Request Model
- user, title, category, description
- amountNeeded, amountRaised
- status, urgency, verificationStatus
- location, documents
- timestamps

## 🚀 Deployment

### Deploy to Railway

1. Create account on [Railway](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Deploy to Render

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### MongoDB Atlas Setup

1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster (Free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Add to `.env` as `MONGODB_URI`

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| RATE_LIMIT_WINDOW_MS | Rate limit window | 900000 (15 min) |
| RATE_LIMIT_MAX_REQUESTS | Max requests per window | 100 |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Helping Hands Team

## 🙏 Acknowledgments

- Express.js for the web framework
- MongoDB for the database
- JWT for authentication
- All contributors and supporters

## 📞 Support

For support, email support@helpinghands.org or create an issue in the repository.
