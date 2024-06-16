# Expense Tracker
- Built using `React`, `ChakraUI`, `NodeJS`

## Features
- CRUD operations of expenses
- Premium only features such as leaderboard and premium report download
- Integrated Razropay API for premium purchasing, AWS S3 buckets for report history.

## Installation
- Clone the repository
```
git clone https://github.com/glaucusec/expense-tracker.git
```
- Change the directory
```
cd expense-tracker
```
- Install the frontend and backend packages.
1. Frontend
```
npm install
```
2. Backend
```
cd server
npm install
```
- Setting up Environment Variables

You have to configure `.env` files for frontend and backend
1. Frontend
```
VITE_ENV=development
VITE_SERVER_URL=http://localhost:3000
VITE_AUTH_TOKEN=
```
2. Backend
```
BUCKET_NAME=d
EMAILTOKEN=
IAM_USER_KEY=
IAM_USER_SECRET=
MONGODB_SERVER=
NODE_ENV=development
ORIGIN_SERVER=
RAZORPAY_KEYID=
RAZORPAY_SECRET=
SECRET_KEY=
TOKEN_SECRET=
```

- Run the server
1. Frontend

    change directory to`expense-tracker`
```
cd expense-tracker
npm run dev
```
2. Backend
change directory to `/server`
```
cd /server
npm run dev
```