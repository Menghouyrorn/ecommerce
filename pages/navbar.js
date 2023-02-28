import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Link } from "@mui/material";
import { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DataFrom from "./data";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Card, CardActions, CardContent, CardMedia, Grid } from "@mui/material";
import Tcard from "./card";
import { useState, useEffect, useLayoutEffect } from "react";
import { fireAuth, firestore } from "../services/firebase";
import { NewReleases } from "@material-ui/icons";

//for search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const navbar = () => {
  const [cart1, setCart1] = React.useState([]);
  const [wish1, setWish1] = React.useState([]);
  const currentUser = fireAuth.currentUser;
  React.useEffect(() => {
    let data = localStorage.getItem("data");
    setCart1(JSON.parse(data));
  }, []);
  React.useEffect(() => {
    let data = localStorage.getItem("wish");
    setWish1(JSON.parse(data));
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //for navbar
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => [
    fireAuth
      .signOut()
      .then((res) => {
        router.push("./");
        localStorage.setItem("data", "[]");
      })
      .catch((err) => {
        console.log(err.message);
      }),
  ];

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          onClick={() => router.push("./wish")}
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
        >
          <Badge badgeContent={wish1.length} color="error">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
        <p>Wish list</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 18 new add cart"
          color="inherit"
        >
          <Link onClick={() => router.push("./detail")}>
            <Badge badgeContent={cart1.length} color="error">
              <ShoppingCartIcon style={{ color: "black" }} />
            </Badge>
          </Link>
        </IconButton>
        <p>Add cart</p>
      </MenuItem>
      {!currentUser ? (
        <MenuItem>
          <Link
            onClick={() => router.push("./login")}
            underline="none"
            style={{ margin: "0 auto" }}
          >
            <Badge className="text-dark">Login</Badge>
          </Link>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
    </Menu>
  );
  
  //for cart
  const [cart, setCart] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [wish, setWish] = React.useState([]);
  React.useEffect(() => {
    firestore.collection("Product").onSnapshot((snapshot) => {
      let datain = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(datain);
    });
  }, []);
  const handleAddCart = (data) => {
    if (currentUser) {
      let newCart = [...cart];
      let itemInCart = newCart.find((item) => data.id === item.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        itemInCart = {
          ...data,
          quantity: 1,
        };
        newCart.push(itemInCart);
      }
      setCart(newCart);
    } else {
      alert("Please Login !");
    }
  };
  useLayoutEffect(() => {
    if (localStorage.getItem("data")) {
      setCart(JSON.parse(localStorage.getItem("data")));
    } else {
      localStorage.setItem("data", JSON.stringify(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cart));
  }, [cart]);

  const handleAddWish = (data) => {
    if (!currentUser) {
      alert("Please Login !");
    } else {
      let newWhish = [...wish];
      let itemInWish = newWhish.find((item) => data.id === item.id);
      if (itemInWish) {
        itemInWish.quantity++;
      } else {
        itemInWish = {
          ...data,
          quantity: 1,
        };
        newWhish.push(itemInWish);
      }
      setWish(newWhish);
      // setWish([...wish, { ...item }]);
    }
  };
  useLayoutEffect(() => {
    if (localStorage.getItem("wish")) {
      setWish(JSON.parse(localStorage.getItem("wish")));
    } else {
      localStorage.setItem("wish", JSON.stringify(wish));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wish));
  }, [wish]);

  // for search

  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState([]);
  // const handleSeacher = (e) => {
  //   const valueSearch = e.target.value;
  //   setValue(valueSearch);
  //   const newFilter = data.filter((value) => {
  //     return value.name.toLowerCase().includes(valueSearch.toLowerCase());
  //   });
  //   console.log(valueSearch);
  //   if (valueSearch === "") {
  //     setSearch([]);
  //   } else {
  //     setSearch(newFilter);
  //   }
  // };

  const [filter, setFilter] = React.useState('');

    const searchText = (e) => {
        setFilter(e.target.value);
    }
    let searchData = data.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });
  
  const router = useRouter();
  return (
    <>
      <div>
        <AppBar position="static" className="bg-dark">
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => router.push("/")}
            >
              Shop
            </IconButton>
            {router.pathname === "/wish" || router.pathname === "/detail" ? (
              <div></div>
            ) : (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  className="dropbtn"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  // value={filter}
                  // onChange={searchText.bind(this)}
                  value={filter}
                  onChange={searchText.bind(this)}
                />
              </Search>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={() => router.push("./wish")}
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={wish1.length} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 18 new add cart"
                color="inherit"
                onClick={() => router.push("./detail")}
              >
                <Badge badgeContent={cart1.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {!currentUser ? (
                <Button
                  size="small"
                  aria-label="show 18 new add cart"
                  color="inherit"
                  onClick={() => router.push("./login")}
                >
                  <Badge badgeContent={cart1.length} color="error">
                    Login
                  </Badge>
                </Button>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <div>
        {router.pathname === "/wish" || router.pathname === "/detail" ? (
          <div></div>
        ) : (
          <div>
            {data.length === 0 ? (
              <div>Don't has Product Please Add !</div>
            ) : (
              <Grid container spacing={1} style={{ padding: 20 }}>
                {searchData.map((item, index) => {
                  return (
                    <Grid key={index} item>
                      <Tcard
                        ImageUrl={item.url}
                        description={item.description}
                        priceBuy={item.price}
                        name={item.name}
                        handleBuy={() => handleAddCart(item)}
                        handleWish={() => handleAddWish(item)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default navbar;
