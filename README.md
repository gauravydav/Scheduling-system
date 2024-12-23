# Scheduling System

This project is a Scheduling System that allows an admin to manage employee schedules. It includes user authentication, scheduling, and email notifications using Nodemailer. The backend is built with Node.js, Express.js, and MongoDB, and the frontend is developed using React.

---

## Features

1. **Authentication**
   - Admin registration and login.
   - Passwords are securely hashed using bcrypt.
   - Role-based access (Admin only).

2. **Scheduling**
   - Admin can create, update, and delete schedules for employees.
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



