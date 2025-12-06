# Helping Hands API Documentation

Complete API documentation with request/response examples.

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64abc123...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64abc123...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user",
      "totalDonations": 5,
      "totalDonated": 15000
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
**GET** `/auth/me` (Protected)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "totalDonations": 5,
    "totalDonated": 15000,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 💰 Donation Endpoints

### Create Donation
**POST** `/donations`

**Request Body:**
```json
{
  "amount": 5000,
  "cause": "medical",
  "paymentMethod": "upi",
  "paymentInfo": "john@upi",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "isMonthly": false,
  "requestId": "64xyz789..." // Optional
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Donation created successfully",
  "data": {
    "id": "64def456...",
    "amount": 5000,
    "cause": "medical",
    "paymentMethod": "upi",
    "transactionId": "TXN1234567890ABC",
    "status": "completed",
    "donorName": "John Doe",
    "donorEmail": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Donations
**GET** `/donations?page=1&limit=10&status=completed&cause=medical`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (pending/completed/failed/refunded)
- `cause` (optional): Filter by cause
- `paymentMethod` (optional): Filter by payment method

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 150,
  "page": 1,
  "pages": 15,
  "data": [
    {
      "id": "64def456...",
      "amount": 5000,
      "cause": "medical",
      "status": "completed",
      "donorName": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 🆘 Request Endpoints

### Create Help Request
**POST** `/requests` (Protected)

**Request Body:**
```json
{
  "title": "Medical Emergency - Cancer Treatment",
  "category": "medical",
  "description": "Urgent help needed for cancer treatment...",
  "amountNeeded": 500000,
  "requesterName": "Jane Smith",
  "requesterEmail": "jane@example.com",
  "requesterPhone": "9876543210",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "urgency": "urgent"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Request created successfully. It will be reviewed by our team.",
  "data": {
    "id": "64ghi789...",
    "title": "Medical Emergency - Cancer Treatment",
    "category": "medical",
    "amountNeeded": 500000,
    "amountRaised": 0,
    "status": "pending",
    "urgency": "urgent",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Requests
**GET** `/requests?page=1&limit=10&category=medical&status=active`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category
- `status` (optional): Filter by status
- `urgency` (optional): Filter by urgency

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 156,
  "page": 1,
  "pages": 16,
  "data": [
    {
      "id": "64ghi789...",
      "title": "Medical Emergency - Cancer Treatment",
      "category": "medical",
      "amountNeeded": 500000,
      "amountRaised": 325000,
      "progressPercentage": 65,
      "status": "active",
      "urgency": "urgent",
      "donorsCount": 45,
      "location": {
        "city": "Mumbai",
        "state": "Maharashtra"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Request
**GET** `/requests/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "64ghi789...",
    "title": "Medical Emergency - Cancer Treatment",
    "category": "medical",
    "description": "Detailed description...",
    "amountNeeded": 500000,
    "amountRaised": 325000,
    "progressPercentage": 65,
    "status": "active",
    "urgency": "urgent",
    "requesterName": "Jane Smith",
    "requesterEmail": "jane@example.com",
    "requesterPhone": "9876543210",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra"
    },
    "donorsCount": 45,
    "views": 1250,
    "donations": [
      {
        "amount": 5000,
        "donorName": "John Doe",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Approve Request (Admin)
**PUT** `/requests/:id/approve` (Protected, Admin)

**Response (200):**
```json
{
  "success": true,
  "message": "Request approved successfully",
  "data": {
    "id": "64ghi789...",
    "status": "approved",
    "verificationStatus": "verified"
  }
}
```

---

## 📊 Statistics Endpoints

### Get Overall Statistics
**GET** `/stats/overall`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalDonations": 12543,
    "totalAmountRaised": 4520000,
    "averageDonation": 3600,
    "totalRequests": 450,
    "activeRequests": 156,
    "completedRequests": 280,
    "peopleHelped": 8921
  }
}
```

### Get Donation Statistics
**GET** `/stats/donations`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "byCause": [
      {
        "_id": "medical",
        "count": 5420,
        "totalAmount": 2150000
      },
      {
        "_id": "education",
        "count": 3210,
        "totalAmount": 980000
      }
    ],
    "byPaymentMethod": [
      {
        "_id": "upi",
        "count": 6500,
        "totalAmount": 2200000
      }
    ],
    "monthlyDonations": [
      {
        "_id": { "year": 2024, "month": 1 },
        "count": 1200,
        "totalAmount": 450000
      }
    ],
    "topDonors": [
      {
        "_id": "donor@example.com",
        "name": "Top Donor",
        "totalDonated": 150000,
        "donationCount": 25
      }
    ]
  }
}
```

---

## ❌ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Amounts are in Indian Rupees (₹)
- Pagination starts from page 1
- Default page limit is 10 items
- JWT tokens expire after 7 days (configurable)
- Rate limit: 100 requests per 15 minutes per IP
