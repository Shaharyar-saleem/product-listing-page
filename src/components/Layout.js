import React, { useState, useContext } from "react";
import { Context } from "../context";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemsCount = 5; // Replace with your actual cart items count
  const drawerWidth = 250;
  const { state } = useContext(Context);
  console.log("Cart value:", state);
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Store
          </Typography>
          <IconButton
            color="inherit"
            aria-label="cart"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box mt={8} maxWidth="lg" sx={{ ml: "auto", mr: "auto" }}>
        {children}
      </Box>
      <Drawer anchor="right" open={isCartOpen} onClose={handleCloseCart}>
        <Box sx={{ width: 250 }} onClick={handleCloseCart}>
          <List>
            {/* Replace with your logic to map over the cart items */}
            {Array.from(Array(cartItemsCount).keys()).map((item) => (
              <ListItem button key={item}>
                <ListItemText primary={`Item ${item + 1}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Layout;
