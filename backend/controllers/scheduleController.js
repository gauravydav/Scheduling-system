const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");
const Employee = require("../models/Employee");
const sendEmail = require("../utils/sendEmail");

exports.createSchedule = async (req, res) => {
  const { employeeIds, scheduleDate, scheduleTime, comment, adminEmail } = req.body;

  try {
    const validEmployeeIds = [];

    for (let id of employeeIds) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        validEmployeeIds.push(new mongoose.Types.ObjectId(id));
      } else {
        const employee = await Employee.findOne({ employeeId: id });

        if (employee) {
          validEmployeeIds.push(employee._id);
        } else {
          throw new Error(`Employee with ID ${id} not found.`);
        }
      }
    }

    const schedule = new Schedule({
      employeeIds: validEmployeeIds,
      scheduleDate,
      scheduleTime,
      comment,
    });

    const scheduledTime = new Date(scheduleDate);
    const [hours, minutes] = scheduleTime.split(":");
    scheduledTime.setHours(hours, minutes);

    if (scheduledTime.getTime() <= Date.now()) {
      return res.status(400).json({ message: "Scheduled time cannot be in the past." });
    }

    await schedule.save();

    const employees = await Employee.find({ _id: { $in: validEmployeeIds } });

    const sendScheduleEmail = async (employee) => {
      const emailText = `You have a new schedule on ${new Date(scheduleDate).toLocaleString()} at ${scheduleTime}. Comment: ${comment}`;
      await sendEmail(employee.email, "New Schedule Notification", emailText);
    };

    const humanReadableTime = scheduledTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });

    const oneHourBefore = new Date(scheduledTime.getTime() - 60 * 60 * 1000);
    const thirtyMinutesBefore = new Date(scheduledTime.getTime() - 30 * 60 * 1000);
    const fifteenMinutesBefore = new Date(scheduledTime.getTime() - 15 * 60 * 1000);

    const delay = (time) => time.getTime() - Date.now();

    if (delay(oneHourBefore) > 0) {
      setTimeout(async () => {
        for (let employee of employees) {
          await sendScheduleEmail(employee);
        }
      }, delay(oneHourBefore));
    }

    if (delay(thirtyMinutesBefore) > 0) {
      setTimeout(async () => {
        for (let employee of employees) {
          await sendScheduleEmail(employee);
        }
      }, delay(thirtyMinutesBefore));
    }

    if (delay(fifteenMinutesBefore) > 0) {
      setTimeout(async () => {
        for (let employee of employees) {
          await sendScheduleEmail(employee);
        }

        await sendEmail(
          adminEmail,
          "All Schedule Emails Sent",
          `All emails for the scheduled time of ${humanReadableTime} have been sent.`
        );
      }, delay(fifteenMinutesBefore));
    }

    res.status(201).json({ message: "Schedule created successfully", schedule });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
