const express = require("express");
const Employee = require("../models/Employee"); 
const router = express.Router();

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error while fetching employees" });
  }
});

module.exports = router;
