# FiveStack

## Brief Description
FiveStack is a real-time chat application designed for seamless connection between users. It features instant message delivery, live online status indicators, and media uploads. Built with a modern tech stack, FiveStack ensures a snappy user experience and OTP-based login.

## Link
https://five-stack-five.vercel.app/

## Tech Stack
**Frontend:** React, Tailwind CSS, Zustand  
**Backend:** Node.js, Express.js, Prisma, Socket.io, Cloudinary, Google Apps Script (OTP Emails), JWT & Bcrypt
**Database**: PostgreSQL

## Screenshots

![Landing Page Placeholder](./Frontend/src/assets/ss_1.png)

###

![Chat Interface Placeholder](./Frontend/src/assets/ss_2.png)

## To Run it Locally

### Prerequisites
*   Node.js installed on your machine
*   PostgreSQL installed and running
*   A Cloudinary account (for media uploads)
*   Google App Script to send OTPs

1. Clone the repository
```bash
git clone https://github.com/UserInTheClouds/FiveStack
cd FiveStack
```
2. Backend Setup
```
cd Backend
npm install
 ```
Create a .env file and add:
``` 
DATABASE_URL="postgresql://user:password@localhost:5432/fivestack_db"
JWT_SECRET="your_super_secret_jwt_key"
PORT=3000
DEVSTATUS="DEVELOPMENT"
CLOUDINARY_URL="cloudinary://your_api_key:your_api_secret@your_cloud_name"
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```
Initialize the database with Prisma:
``` 
npx prisma migrate dev 
npm run dev
```
Run the backend 
```
npm run dev 
```

3. Frontend Setup
``` 
cd Frontend
npm install
npm run dev
```
