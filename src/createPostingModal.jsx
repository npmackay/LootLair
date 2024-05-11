import { Modal, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useCurrentUser } from "./components/contexts/currentUserContext";
function CreatePostingModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { currentUser: user } = useCurrentUser();
  function submitPosting() {
    console.log("submitting posting");
    fetch("http://localhost:3001/createItemPosting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId: user.id,
        title: title,
        description: description,
        price: price,
        itemStatus: "available",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    props.handleClose();
  }
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Posting
        </Typography>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={submitPosting}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
}

export default CreatePostingModal;
