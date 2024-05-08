import { Grid, Paper, Typography, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";
import HeaderNavBar from "./components/headerNavBar";
import { useCurrentUser } from "./components/contexts/currentUserContext";

function ProfilePage() {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState(currentUser);

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
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default ProfilePage;
