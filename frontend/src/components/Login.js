import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";
import { Slide } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { username, password });

      if (response.data.token) {
        Cookies.set("email", username, { expires: 7 }); 
        Cookies.set("authToken", response.data.token, { expires: 7 }); 

        setSnackbarMessage("Login Successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/scheduling");
        }, 1500);
      } else {
        setSnackbarMessage(response.data.message || "Invalid credentials");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Error logging in");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #00bcd4, #00796b)", 
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, color: "#00796b", fontWeight: "bold" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              marginBottom: 2,
              "& .MuiInputLabel-root": { color: "#00796b" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00796b" },
                "&:hover fieldset": { borderColor: "#004d40" },
                "&.Mui-focused fieldset": { borderColor: "#004d40" },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 2,
              "& .MuiInputLabel-root": { color: "#00796b" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00796b" },
                "&:hover fieldset": { borderColor: "#004d40" },
                "&.Mui-focused fieldset": { borderColor: "#004d40" },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px",
              marginBottom: 2,
              backgroundColor: "#00796b",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#004d40",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Login
          </Button>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={(props) => <Slide {...props} direction="down" />}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Login;
