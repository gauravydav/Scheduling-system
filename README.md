# Scheduling System

This project is a Scheduling System that allows an admin to manage employee schedules. It includes user authentication, scheduling, and email notifications using Nodemailer. The backend is built with Node.js, Express.js, and MongoDB, and the frontend is developed using React.

---

## Features

1. **Authentication**
   - Admin registration and login.
   - Passwords are securely hashed using bcrypt.
   - Role-based access (Admin only).

2. **Scheduling**
   - Admin can create schedules for employees.
   - Schedules include a date, time, and a 200-character comment.
   - Notifications are sent to employees and the admin.

3. **Email Notifications**
   - Email notifications are sent using Nodemailer.
   - Notifications are sent:
     - 1 hour before the scheduled time.
     - 30 minutes before the scheduled time.
     - 15 minutes before the scheduled time.
   - Admin receives an email once all notifications are sent.

4. **Technologies**
   - Backend: Node.js, Express.js, MongoDB.
   - Frontend: React.
   - Email Notifications: Nodemailer.


# Frontend Installation

### 1. Clone the repository

```bash
git clone https://github.com/gauravydav/Scheduling-system
cd frontend
```

### 2. Install dependencies
#### Install the necessary dependencies using npm

```bash
npm install
```

### 3. Run the project locally
#### Once the dependencies are installed, you can start the development server

```bash
npm start
```

### This will start the React application on http://localhost:3000

### 4. Open the app
##### Open your browser and navigate to http://localhost:3000 to see the app running locally

# Backend Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/gauravydav/Scheduling-system
cd backend
```


### 2. Set up environment variables
##### Create a .env file in the root directory and add the following content:

```bash
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.7u6tu.mongodb.net/
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

### Make sure to replace the placeholders with actual values.

### 3. Install dependencies

```bash
npm install
```

### 4. Run the backend server

```bash
npm run dev
```

###### This will run the backend server locally. Check logs for details on the server startup.





  



