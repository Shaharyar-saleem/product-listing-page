import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Grid,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const Layout = ({ children }) => {
  const cartItemsCount = 5; // Replace with your actual cart items count
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Store
          </Typography>
          <IconButton color="inherit" aria-label="cart">
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
