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
    {
      id: 1,
      name: "League of Legends",
      backgroundImg:
        "url(https://images.prismic.io/play-vs/6c423286e877921fb6659122b16e1845df833e1f_league-of-legends-hero-splash.jpg?auto=compress,format)",
    },
    {
      id: 2,
      name: "Valorant",
      backgroundImg:
        "url(https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/11/11/Uninstall-Valorant.jpg)",
    },
    {
      id: 3,
      name: "CS2",
      backgroundImg:
        "url(https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg)",
    },
    {
      id: 4,
      name: "Rocket League",
      backgroundImg:
        "url(https://media.graphassets.com/resize=fit:clip,height:1080,width:1920/output=format:webp/fLenQ7lsSMSTddNwQ1NA)",
    },
    {
      id: 5,
      name: "Fortnite",
      backgroundImg:
        "url(https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000010192/c7d855443d9ed9d8aa7638f548044a2987c7f22a6dab3136916fcc811039a64b)",
    },
    {
      id: 6,
      name: "Hearthstone",
      backgroundImg:
        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzx1c7aYPLjzT--N2aVAp4xhSzfp-6Z0f-zowuG-4feg&s)",
    },
    {
      id: 7,
      name: "Escape From Tarkov",
      backgroundImg:
        "url(https://assetsio.gnwcdn.com/escape-from-tarkov-rogue-boss-knight.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp)",
    },

    {
      id: 9,
      name: "World of Warcraft",
      backgroundImg:
        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZLQndzGAT2c9fPdIRjdmWog8jXkuNZKHY9LliX6HiA&s)",
    },
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
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            {supportedGames.map((game, index) => (
              <Grid
                sx={{ display: "flex", padding: "0.5rem" }}
                key={index}
                item
                xs={3}
              >
                <Paper
                  sx={{
                    width: "32rem",
                    height: "15rem",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${game.backgroundImg}`,
                    backgroundSize: "cover",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  key={game.id}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      color: "white",
                      textShadow: "2px 2px 4px #000000",
                    }}
                  >
                    {game.name}
                  </Typography>
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
