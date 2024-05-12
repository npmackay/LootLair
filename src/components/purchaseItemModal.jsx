import { Modal, Typography, Button, Grid, Box, Paper } from "@mui/material";
import { useCurrentUser } from "./contexts/currentUserContext";
function PurchaseItemModal({ purchaseData, open, handleClose }) {
  console.log("purchaseData", purchaseData);
  const { currentUser: user } = useCurrentUser();

  const handlePurchase = async () => {
    console.log("Purchase Item");
    const buyerId = user.id;
    const sellerId = purchaseData.sellerId;
    const amount = purchaseData.price;
    const transactionType = "purchase";
    try {
      const response = await fetch("/api/purchaseItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buyerId, sellerId, amount, transactionType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If you need to do something with the response, you can do it here.
      const data = await response.json();
    } catch (error) {
      console.error("An error occurred while purchasing the item:", error);
    }
  };
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
      open={open}
      onClose={handleClose}
    >
      <Box>
        <Typography variant="h6">Purchase Details</Typography>
        <Grid sx={{}} container>
          <Grid item>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                width: "32rem",
                height: "37rem",
                backgroundColor: "#0e0e0f",
              }}
            >
              <Typography sx={{ color: "white" }}>
                Item Name: {purchaseData.title}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Item Description: {purchaseData.description}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Item Price: {purchaseData.price}
              </Typography>
              <Button onClick={handlePurchase}>Purchase</Button>
              <Button onClick={handleClose}>Close</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default PurchaseItemModal;
