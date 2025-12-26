# Backend Deployment Guide for AWS App Runner

## Backend Setup (Node.js + Express)

### Prerequisites
- Node.js 16+
- MongoDB Atlas cluster
- AWS Account with App Runner access

### Local Development

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file** (use `.env.example` as template):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=dbname
   PORT=5000
   ```

3. **Run server locally:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### AWS App Runner Deployment

#### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/select cluster
3. Navigate to **Drivers** > Copy connection string
4. URL-encode special characters in password
5. Add database name: `?appName=dbname`
6. Set **Network Access** to allow `0.0.0.0/0` (AWS IPs)

#### Step 2: Deploy Backend to App Runner
1. **Create GitHub repository** with only `/server` files
   - Or use this repo and configure App Runner to use `/server` as source

2. **In AWS Console:**
   - App Runner > Create service
   - Select "Source code repository"
   - Connect GitHub account
   - Select repository and branch
   - **Configuration:**
     - Runtime: Node.js 18
     - Build command: `npm install`
     - Start command: `npm start`
   - **Environment variables:**
     ```
     MONGO_URI = mongodb+srv://...
     PORT = 10000
     ```
   - Deploy

3. **Verify deployment:**
   - App Runner will show service URL: `https://xxxxx.us-east-1.apprunner.amazonaws.com`
   - Test endpoint: `curl https://xxxxx.us-east-1.apprunner.amazonaws.com/api/certificates`

### API Endpoints
- `GET /api/certificates` - Get all certificates
- `GET /api/certificate/:id` - Get certificate by ID
- `POST /api/upload` - Upload new certificate
- `PUT /api/certificate/:id` - Update certificate
- `DELETE /api/certificate/:id` - Delete certificate
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts
- `PUT /api/contact/:id/read` - Mark contact as read
- `DELETE /api/contact/:id` - Delete contact

### Troubleshooting

**Error: "Certificate ID not found"**
- Check MongoDB connection: `MONGO_URI` in App Runner env vars
- Verify network access in MongoDB Atlas (0.0.0.0/0)

**Error: "Cannot connect to database"**
- Verify `MONGO_URI` format and credentials
- Check MongoDB Atlas cluster status
- Ensure password is URL-encoded

**Server won't start**
- Check logs in App Runner dashboard
- Verify `package.json` has `"start": "node index.js"`
- Ensure `PORT` environment variable is set

---

## Frontend Deployment (React + Vite)

See `/client/README.md` for frontend deployment on AWS Amplify or S3 + CloudFront.

Frontend calls backend using App Runner service URL:
```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
```

---

## Important Notes

- ✅ Never commit `.env` file with credentials to GitHub
- ✅ Use `.env.example` to document required variables
- ✅ App Runner sets `PORT` automatically; listen on it
- ✅ Use `process.env.*` for all configuration
- ✅ MongoDB must allow connections from 0.0.0.0/0 for AWS
