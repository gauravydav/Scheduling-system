const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

// Example email sending function
const sendReminderEmails = async (schedule) => {
  const { employeeIds, scheduleDate, scheduleTime, comment } = schedule;

  for (let employeeId of employeeIds) {
    const email = getEmailForUser(employeeId);  // You'll need a way to get the email of an employee

    // Send emails with appropriate reminders (1 hour, 30 minutes, and 15 minutes before)
    const timeToSend = new Date(scheduleDate).setHours(scheduleTime.split(":")[0], scheduleTime.split(":")[1]) - new Date();
    
    setTimeout(() => {
      sendEmail(email, "Schedule Reminder", `Your schedule is at ${scheduleTime}. Comment: ${comment}`);
    }, timeToSend - 60 * 60 * 1000);  // 1 hour reminder
    
    // Similarly set for 30 minutes and 15 minutes
  }
};
