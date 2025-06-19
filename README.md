# 📊 Campaign Tracker (Full Stack App)

A full-stack web app to manage marketing campaigns with user authentication — built using **React**, **Express**, **MySQL**, **JWT**, and **Tailwind CSS**.

---

## 🔧 Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Auth**: JWT tokens (stored in cookies)

---

## 📁 Folder Structure
project-root/
├── client/ # React frontend
│ ├── LoginPage.jsx
│ ├── SignupPage.jsx
│ ├── Dashboard.jsx
│ └── AddCampaignForm.jsx
│
├── server/ # Express backend
│ ├── config/db.js # DB connection & table creation
│ ├── middlewares/auth.js # JWT verification middleware
│ ├── routes/auth.js # Signup/Login/Logout routes
│ ├── routes/campaign.js # Campaign CRUD routes
│ └── server.js # Server entry point

---

.env 
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=campaign_db
JWT_SECRET=your_jwt_secret
PORT=5000

---

Run the Project using 

cd backend
npm run dev

cd frontend
npm run dev

---

✅ Features
🔐 User Auth: Signup/Login with bcrypt + JWT

🍪 Cookies: JWT stored securely in browser cookies

📄 CRUD: Add, edit, and delete campaigns

📊 Dashboard: View campaign performance

💅 UI: Tailwind CSS for responsive design

🚪 Logout: Session handling with logout button

---

🖼 UI Screens
✅ Login / Signup

✅ Dashboard with Campaign List

✅ Add / Edit / Delete Campaigns

---
👨‍💻 Author
Made with ❤️ by Maaz Ahmad Khan
Linkedin : linkedin.com/in/maaz-ahmad-khan-b052062b6
