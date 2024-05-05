import { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreatePostingModal from "../createPostingModal";
import { useCurrentUser } from "../components/contexts/currentUserContext";
function HeaderNavBar() {
  const [openCreatePosting, setOpenCreatePosting] = useState(false);
  const { currentUser: user } = useCurrentUser();
  let navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography variant="h4">Welcome {user?.currentUser} </Typography>
        <Button color="inherit" onClick={() => setOpenCreatePosting(true)}>
          Create Posting
        </Button>

        <Button color="inherit" onClick={() => navigate("/marketplace")}>
          MarketPlace
        </Button>
        <Button color="inherit" onClick={() => navigate("/homepage")}>
          Homepage
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
      <CreatePostingModal
        open={openCreatePosting}
        handleClose={() => setOpenCreatePosting(false)}
      />
    </AppBar>
  );
}

export default HeaderNavBar;
