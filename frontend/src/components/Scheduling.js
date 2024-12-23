import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Scheduling = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees", err));
  }, []);

  const handleSubmit = async () => {
    const adminEmail = Cookies.get("email");

    if (!scheduleDate || !selectedEmployees.length || !scheduleTime || comment.length > 200) {
      setError("Please fill all fields correctly.");
      return;
    }

    try {
      const scheduleDateTime = new Date(scheduleDate);
      const [hours, minutes] = scheduleTime.split(":");
      scheduleDateTime.setHours(hours);
      scheduleDateTime.setMinutes(minutes);

      const scheduleData = {
        employeeIds: selectedEmployees,
        scheduleDate: scheduleDateTime.toISOString(),
        scheduleTime,
        comment,
        adminEmail,
      };

      const response = await axios.post("/api/schedules", scheduleData);

      if (response.data) {
        setSnackbarMessage("Schedule created successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setScheduleDate("");
        setScheduleTime("");
        setComment("");
        setSelectedEmployees([]);
      } else {
        setSnackbarMessage(response.data.message || "Error creating schedule.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error creating schedule.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleEmployeeSelect = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((emp) => emp !== id) : [...prev, id]
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("authToken");
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "2rem" }}>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 16px",
          borderRadius: "5px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            backgroundColor: "#d32f2f",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Logout
      </Button>

      <Typography variant="h4" color="primary" sx={{ textAlign: "center", mb: 5, fontWeight: 600 }}>
        Schedule Employees
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: 2, backgroundColor: "#ffffff", p: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="secondary" sx={{ mb: 2 }}>Select Employees</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="employee table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#2196F3", color: "white" }}>Select</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#2196F3", color: "white" }}>Employee ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#2196F3", color: "white" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#2196F3", color: "white" }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow
                    key={emp._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                      backgroundColor: selectedEmployees.includes(emp._id) ? '#e0f7fa' : 'transparent',
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        onChange={() => handleEmployeeSelect(emp._id)}
                        checked={selectedEmployees.includes(emp._id)}
                      />
                    </TableCell>
                    <TableCell>{emp.employeeId}</TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Box sx={{ width: "2rem" }}></Box>

        <Grid item xs={12} md={5}>
          <Typography variant="h6" color="secondary" sx={{ mb: 2 }}>Schedule Form</Typography>
          <Box sx={{ border: "1px solid #ddd", borderRadius: 1, p: 3, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <TextField
              label="Schedule Date"
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 2 }}
            />
            {error && !scheduleDate && <Typography color="error" sx={{ fontSize: '0.875rem' }}>This field is required.</Typography>}

            <TextField
              label="Schedule Time"
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            {error && !scheduleTime && <Typography color="error" sx={{ fontSize: '0.875rem' }}>This field is required.</Typography>}

            <TextField
              label="Comment (200 characters max)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={3}
              inputProps={{ maxLength: 200 }}
              sx={{ mb: 2 }}
            />
            {error && comment.length > 200 && <Typography color="error" sx={{ fontSize: '0.875rem' }}>Comment exceeds the maximum length.</Typography>}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                '&:hover': { backgroundColor: "#1976d2", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)" },
                padding: "12px 16px",
              }}
            >
              Submit Schedule
            </Button>
          </Box>
        </Grid>
      </Box>

      {error && <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>{error}</Typography>}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Scheduling;
