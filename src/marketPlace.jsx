import { useState, useEffect } from "react";
import { Typography, Paper, Grid, Box, Button } from "@mui/material";
import { useCurrentUser } from "./components/contexts/currentUserContext";
import HeaderNavBar from "./components/headerNavBar";
function MarketPlace() {
  const URL = "http://localhost:3001";
  const { currentUser: user } = useCurrentUser();
  const [itemPostings, setItemPostings] = useState([]);
  useEffect(() => {
    async function fetchItemPostings() {
      const response = await fetch(
        `${URL}/getItemPostings/userId=${user?.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setItemPostings(data);
      } else {
        console.error("Failed to fetch item postings");
      }
    }

    fetchItemPostings();
  }, []);

  return (
    <>
      <HeaderNavBar />
      <Grid
        container
        spacing={2}
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
            {itemPostings.length > 0 ? (
              itemPostings.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    width: "50%",
                    p: 2,
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body1">{item.description}</Typography>
                  <Typography variant="body1">{item.price}</Typography>
                  <Button variant="contained">Buy</Button>
                </Paper>
              ))
            ) : (
              <Typography variant="h6" color="white">
                No item postings
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MarketPlace;
