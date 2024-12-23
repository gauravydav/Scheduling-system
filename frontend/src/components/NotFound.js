import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { AccessAlarm } from "@mui/icons-material"; 

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
        padding: 2,
      }}
    >
      <AccessAlarm sx={{ fontSize: 80, color: "#2196F3", marginBottom: 2 }} /> 
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ color: "#666", marginBottom: 3 }}>
        The page you are looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{
          padding: "12px 24px",
          backgroundColor: "#00796b",
          "&:hover": {
            backgroundColor: "#004d40",
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
