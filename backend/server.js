require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const Employee = require("./models/Employee");
const employeeRoutes = require("./routes/employee");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB();
// Function to add 10 employees manually
// const addEmployeesManually = async () => {
//   try {
//     const employees = [];

//     for (let i = 1; i <= 10; i++) {
//       employees.push({
//         employeeId: `employee-id-${i}`,
//         name: `Employee ${i}`,
//         email: `employee${i}@example.com`
//       });
//     }

//     // Insert the employees into the database
//     const addedEmployees = await Employee.insertMany(employees);

//     // console.log("10 employees added successfully:", addedEmployees);
//   } catch (err) {
//     console.error("Error adding employees:", err);
//   }
// };

// addEmployeesManually();

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/schedules", scheduleRoutes); 
app.use("/api", employeeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
