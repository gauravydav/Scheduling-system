const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  employeeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }],
  scheduleDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return !isNaN(Date.parse(value)); 
      },
      message: "Invalid schedule date"
    }
  },
  scheduleTime: { 
    type: String, 
    required: true,
    match: /^(2[0-3]|[01][0-9]):([0-5][0-9])$/, 
    message: "Invalid time format, must be in HH:mm format"
  },
  comment: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
