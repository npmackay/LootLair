import { useState, useEffect } from "react";
import { Typography, Paper, Grid, Box, Button } from "@mui/material";
import { useCurrentUser } from "./components/contexts/currentUserContext";
import HeaderNavBar from "./components/headerNavBar";
import ItemPostingTable from "./components/itemPostingTable";

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
        <Grid item xs={12}>
          <ItemPostingTable items={itemPostings} />
        </Grid>
      </Grid>
    </>
  );
}

export default MarketPlace;
