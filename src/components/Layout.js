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
  Stack,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  let totalAmount = 0;
  let totalQuantity = 0;

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  for (const [key] of Object.entries(cart)) {
    totalAmount = totalAmount + cart[key].price * cart[key].quantity;
    console.log("product quantity here:", cart[key].quantity);
    totalQuantity = totalQuantity + cart[key].quantity;
  }

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
            <Badge
              badgeContent={totalQuantity === 0 ? "0" : totalQuantity}
              color="error"
            >
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
            {Object.entries(cart).map(([key, value]) => {
              return (
                <ListItem key={key}>
                  <Stack
                    direction="row"
                    spacing={1}
                    display="flex"
                    alignItems="center"
                  >
                    <Box>
                      <img
                        src={cart[key].thumbnail}
                        alt={cart[key].title}
                        width={80}
                        height={50}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">
                        {cart[key].title}
                      </Typography>
                      <Typography variant="subtitle2" color="secondary">
                        {`€${cart[key].price}`}
                      </Typography>
                    </Box>
                    <Box pl={2}>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: cart[key],
                          });
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Stack>
                </ListItem>
              );
            })}
          </List>
          <Typography
            textAlign="center"
            sx={{ fontWeight: "bold" }}
          >{`Total: €${totalAmount}`}</Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Layout;
