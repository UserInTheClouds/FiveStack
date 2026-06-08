# FiveStack

FiveStack is a real-time messaging platform built with React, Node.js, Express, and PostgreSQL. Features OTP-based email authentication, real-time presence tracking and messaging via Socket.io, image sharing via Cloudinary, and access/refresh token based session management (with token rotation and reuse detection)

## Link
https://five-stack-five.vercel.app/

## Tech Stack
**Frontend:** React, Tailwind CSS, Zustand  
**Backend:** Node.js, Express.js, Prisma, Socket.io, Cloudinary, Google Apps Script (OTP mails), JWT & Bcrypt
**Database**: PostgreSQL

## Chat Interface
![Chat Interface Screenshot](./Frontend/src/assets/chat_ss.png)

## To Run it Locally

### Prerequisites
*   Node.js installed on your machine
*   PostgreSQL installed and running
*   A Cloudinary account (for media uploads)
*   Google Apps Script to send OTPs

### Google Apps Script
```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  MailApp.sendEmail({
    to: data.to,
    subject: data.subject,
    htmlBody: data.html
  });
  return ContentService.createTextOutput(JSON.stringify({status: "success"}))
    .setMimeType(ContentService.MimeType.JSON);} 
```

1. Clone the repository
```bash
git clone https://github.com/UserInTheClouds/FiveStack
cd FiveStack
```
2. Backend Setup
```bash
cd Backend
npm install
 ```
Create a .env file and add:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/fivestack_db"
ACCESS_TOKEN_SECRET="your_super_secret__secretforaccesstoken"
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
REFRESH_TOKEN_SECRET="yoursupersecret_secretforrefresh"
PORT=3000
DEVSTATUS="DEVELOPMENT"
CLOUDINARY_URL="cloudinary://your_api_key:your_api_secret@your_cloud_name"
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```
Initialize the database with Prisma:
```bash 
npx prisma migrate dev 
```

Run the backend 
```bash
npm run dev 
```

3. Frontend Setup

```bash 
cd Frontend
npm install
npm run dev
```
