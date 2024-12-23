const express = require("express");
const { createSchedule } = require("../controllers/scheduleController");

const router = express.Router();

router.post("/", createSchedule);

module.exports = router;
