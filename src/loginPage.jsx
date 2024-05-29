import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Grid, Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentUser } from "./components/contexts/currentUserContext";
import "./loginPage.css";

function LoginPage() {
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useCurrentUser();
  let navigate = useNavigate();
  const [style, setStyle] = useState({});
  const URL = "http://localhost:3001";
  const handleLogin = async () => {
    const response = await fetch(
      URL + "/login?username=" + username + "&password=" + password
    );
    const data = await response.json();
    if (data.loginBool === true) {
      setCurrentUser({
        currentUser: username,
        userId: data.userId,
        balance: data.balance,
      });
      localStorage.setItem("userId", data.userId);
      toast.success("Logged in successfully!");
      navigate("/homepage");
    } else {
      console.error("Failed to login");
      toast.error("Failed to login");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && username.length == 0 && password.length == 0) {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [username, password]);
  const handleCreateAccount = async () => {
    const response = await fetch(URL + "/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json(); // Parse the response body as JSON
    if (data.message === "user already exists") {
      toast.error("user already exists");
    } else if (data.message === "Added User" + username) {
      toast.success("Account Created Successfully!");
    } else {
      toast.error("Failed to create account");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      for (let i = 0; i < 30; i++) {
        const randomTop = Math.random() * window.innerHeight;
        const randomLeft = Math.random() * window.innerWidth;

        setStyle((prevStyle) => ({
          ...prevStyle,
          [`image${i}`]: {
            position: "absolute",
            top: `${randomTop}px`,
            left: `${randomLeft}px`,
            transition: "top 2s, left 2s",
            animation: "fade-in-out 2s linear",
            zIndex: -1,
          },
        }));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 850,
          color: "white",
        }}
      >
        LootLair
      </Typography>

      <img
        style={{ ...style, animation: "fade-in-out 2s linear" }}
        src="/logoText.svg"
        alt="LootLair"
      />
      <Grid
        container
        spacing={3}
        sx={{
          top: "20%",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
          <Paper
            sx={{
              borderRadius: 7,
              backgroundColor: "#1E0342",
              padding: 10,
              margin: "auto",
              maxWidth: 300,
              zIndex: 56,
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: 850,
                color: "white",
                marginBottom: "3rem",
              }}
            >
              {openCreateAccount ? "Create Account" : "Sign In"}
            </Typography>
            <Box marginBottom="0.75rem">
              <TextField
                label="Username"
                value={username}
                variant="outlined"
                color="primary"
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Box>
            <Box marginBottom="0.75rem">
              <TextField
                label="Password"
                value={password}
                variant="outlined"
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>

            <Box display="flex" justifyContent="center">
              <Button
                sx={{
                  backgroundColor: "#9D44C0",
                  width: "12rem",
                  height: "3rem",
                  borderRadius: 7,
                  marginTop: "1rem",
                }}
                onClick={openCreateAccount ? handleCreateAccount : handleLogin}
                variant="contained"
                color="primary"
              >
                {openCreateAccount ? "Submit" : "Login"}
              </Button>
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginTop: ".75rem",
                }}
                onClick={() => {
                  console.log("Create Account clicked");
                  setOpenCreateAccount(!openCreateAccount);
                }}
              >
                {openCreateAccount ? "Login" : "Create Account"}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {Array.from({ length: 30 }).map((_, i) => (
        <img
          key={i}
          style={{
            ...style[`image${i}`],
            animationDelay: `${i * 0.1}s`,
          }}
          src="/logoText.svg"
          alt="LootLair"
        />
      ))}
    </>
  );
}

export default LoginPage;
