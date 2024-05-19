import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { useEffect, useState } from "react";
import HeaderNavBar from "./components/headerNavBar";
import { useCurrentUser } from "./components/contexts/currentUserContext";

function ProfilePage() {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState(currentUser);

  async function uploadUserProfilePicture() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Send the image file to your server
      const response = await fetch("/uploadProfilePicture", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // If the upload was successful, update the user's profile picture in the state
        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: data.profilePicture,
        }));
      } else {
        console.error("Failed to upload profile picture");
      }
    };

    fileInput.click();
  }

  return (
    <>
      <HeaderNavBar />

      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
          <Paper
            sx={{
              height: "auto",
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "5%",
              padding: "2rem",
            }}
            elevation={10}
          >
            <Typography sx={{ marginBottom: "2rem" }} variant="h4">
              User Profile
            </Typography>

            <Box sx={{ width: "100%", marginBottom: "1rem" }}>
              <Typography>Username : {user?.username}</Typography>
              <TextField
                value={user?.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Box>
            <Box sx={{ width: "100%", marginBottom: "1rem" }}>
              <Typography>Email: {user?.email}</Typography>
              <TextField
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Box>
            <Box sx={{ width: "100%", marginBottom: "1rem" }}>
              <Typography>Full Name: {user?.fullName}</Typography>
              <TextField
                value={user?.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              />
            </Box>
            <Box sx={{ width: "100%", marginBottom: "1rem" }}>
              <Typography>Address: {user?.address}</Typography>
              <TextField
                value={user?.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </Box>
            {/* Add more fields as needed */}
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <Paper>
                <Typography variant="h4">Public Profile</Typography>
                <Box
                  component="img"
                  alt="profile picture"
                  src={user?.profilePicture}
                  sx={{ width: "10rem", height: "10rem" }}
                ></Box>
                <IconButton
                  onClick={() => {
                    uploadUserProfilePicture();
                  }}
                >
                  <FaUpload />
                </IconButton>

                <Typography>Username : {user?.username}</Typography>
              </Paper>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default ProfilePage;
