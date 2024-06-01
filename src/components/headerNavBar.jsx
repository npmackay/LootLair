import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { PlusOneRounded, AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CreatePostingModal from "../createPostingModal";
import { useCurrentUser } from "../components/contexts/currentUserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBalanceModal from "../addBalanceModal";
import { GiPayMoney } from "react-icons/gi";

function HeaderNavBar() {
  const [openCreatePosting, setOpenCreatePosting] = useState(false);
  const { balance: userBalance } = useCurrentUser();
  const { currentUser: user } = useCurrentUser();
  const [openAddBalance, setOpenAddBalance] = useState(false);
  const [userProfilePictureSrc, setUserProfilePictureSrc] = useState("");
  let location = useLocation();
  let navigate = useNavigate();
  const URL = "http://localhost:3001";
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);
  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      const response = await fetch(
        URL + "/getUserProfilePicture/" + user.userId
      );
      if (response.ok) {
        const data = await response.json();
        setUserProfilePictureSrc(data.image_route);
        console.log(
          "User profile picture fetched successfully" + data.image_route
        );
      } else {
        console.error("Failed to fetch user profile picture");
      }
    };

    fetchUserProfilePicture();
  }, []);

  const [currentPage, setCurrentPage] = useState("");

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "#1E0342",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Welcome {user?.currentUser} </Typography>
          <IconButton onClick={() => navigate("/profilePage")}>
            <Box
              sx={{ width: "50px", height: "50px", borderRadius: "90rem" }}
              component="img"
              src={userProfilePictureSrc}
            />
          </IconButton>
        </div>
        <Typography variant="h4">
          Balance: {user?.balance || 0}
          <IconButton onClick={() => setOpenAddBalance(true)}>
            <GiPayMoney color="white" label="Add Balance" />
          </IconButton>
        </Typography>

        <AddBalanceModal
          open={openAddBalance}
          handleClose={() => setOpenAddBalance(false)}
        />

        <Button color="inherit" onClick={() => navigate("/homepage")}>
          Homepage
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            setCurrentPage("/marketplace");
            navigate("/marketplace");
          }}
        >
          MarketPlace
        </Button>
        {currentPage === "/marketplace" && (
          <Button color="inherit" onClick={() => setOpenCreatePosting(true)}>
            Create Posting
          </Button>
        )}
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
