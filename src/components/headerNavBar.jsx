import { useState , useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate , useLocation} from "react-router-dom";
import CreatePostingModal from "../createPostingModal";
import { useCurrentUser } from "../components/contexts/currentUserContext";
function HeaderNavBar() {
  const [openCreatePosting, setOpenCreatePosting] = useState(false);
  const { currentUser: user } = useCurrentUser();
   let location = useLocation();
  let navigate = useNavigate();
    useEffect(() => {
      setCurrentPage(location.pathname);
    }, [location]);
  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
  };
  const [currentPage, setCurrentPage] = useState("");

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography variant="h4">Welcome {user?.currentUser} </Typography>
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
