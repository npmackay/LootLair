import { Modal, Typography, Button, Grid, Box, Paper } from "@mui/material";
import { useCurrentUser } from "./contexts/currentUserContext";
function PurchaseItemModal({ purchaseData, open, handleClose }) {
  console.log("purchaseData", purchaseData);
  const { currentUser: user } = useCurrentUser();
  const handlePurchase = async () => {
    console.log("Purchase Item");
    console.log(user);
    console.log(purchaseData);
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
              <Typography variant="h6">Purchase Details</Typography>w
              <Typography sx={{ color: "white" }}>
                Item Name: {purchaseData.title}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Item Description: {purchaseData.description}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Item Price: {purchaseData.price}
              </Typography>
              <Button onClick={() => handlePurchase()}>Purchase</Button>
              <Button onClick={handleClose}>Close</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default PurchaseItemModal;
