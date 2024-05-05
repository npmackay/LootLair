import {
  Table,
  Grid,
  Box,
  Typography,
  TableBody,
  Paper,
  Card,
} from "@mui/material";

import HeaderNavBar from "./components/headerNavBar";
import React, { useEffect, useState } from "react";

function Homepage() {
  const [itemPostings, setItemPostings] = useState([]);

  
  const supportedGames = [
    { id: 1, name: "League of Legends", backgroundImg: "" },
    { id: 2, name: "Valorant", backgroundImg: "" },
    { id: 3, name: "CS:GO", backgroundImg: "" },
    { id: 4, name: "Overwatch", backgroundImg: "" },
    { id: 5, name: "Rocket League", backgroundImg: "" },
    { id: 6, name: "Fortnite", backgroundImg: "" },
    { id: 7, name: "Hearthstone", backgroundImg: "" },
    { id: 8, name: "Dota 2", backgroundImg: "" },
    { id: 9, name: "Apex Legends", backgroundImg: "" },
    { id: 10, name: "Rainbow Six Siege", backgroundImg: "" },
    { id: 11, name: "World of Warcraft", backgroundImg: "" },
    { id: 12, name: "Minecraft", backgroundImg: "" },
    { id: 13, name: "Call of Duty", backgroundImg: "" },
    { id: 14, name: "FIFA", backgroundImg: "" },
    { id: 15, name: "NBA 2K", backgroundImg: "" },
    { id: 16, name: "Madden", backgroundImg: "" },
    { id: 17, name: "Super Smash Bros", backgroundImg: "" },
    { id: 18, name: "Street Fighter", backgroundImg: "" },
    { id: 19, name: "Tekken", backgroundImg: "" },
    { id: 20, name: "Mortal Kombat", backgroundImg: "" },
  ];

  return (
    <>
      <HeaderNavBar />
      <Grid
        container
        spacing={2} // Decrease this value to reduce the gap
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid sx={{ justifyContent: "center" }} item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper>
              <Typography>My Current Listings</Typography>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            {supportedGames.map((game, index) => (
              <Grid
                sx={{ display: "flex", padding: "0.5rem" }}
                key={index}
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
              >
                <Paper sx={{ width: "100%", height: "6rem" }} key={game.id}>
                  {game.name}
                </Paper>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Homepage;
