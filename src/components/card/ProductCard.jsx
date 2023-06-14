import React, { useState, useContext } from "react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Carousel from "react-material-ui-carousel";

import {
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Rating,
  Button,
} from "@mui/material";
import { Context } from "../../context";

const ProductCard = ({ product, selectProducts, selectedProducts }) => {
  const { dispatch } = useContext(Context);
  const {
    category,
    thumbnail,
    price,
    title,
    description,
    rating,
    images,
    brand,
    discountPercentage,
  } = product;
  const [anchor, setAnchor] = useState(false);
  const handlePopoverOpen = () => {
    setAnchor(true);
  };

  const handlePopoverClose = () => {
    setAnchor(false);
  };

  return (
    <Card
      sx={{ position: "relative" }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      height={500}
    >
      {anchor && (
        <CardContent
          sx={{
            position: "absolute",
            zIndex: 101,
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            backgroundColor: "white",
            animationName: "slide-in",
            animationDuration: "40s",
            animationDelay: "50s",
            overflow: "hidden",
          }}
        >
          <Box pt={3}>
            <Typography variant="subtitle1">
              {`${description.slice(0, 70)}...`}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {`Brand:  ${brand}`}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography
                variant="subtitle2"
                color="secondary"
              >{`Price: €${price}`}</Typography>
              <Typography
                variant="subtitle2"
                color="error"
              >{`${discountPercentage}% off`}</Typography>
            </Stack>
          </Box>
          <Carousel>
            {images.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                alt={`Product Image ${index + 1}`}
                image={image}
                style={{ maxHeight: 200, objectFit: "contain" }}
              />
            ))}
          </Carousel>
          <Stack direction="row" justifyContent="center" spacing={2} mt={1}>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => {
                  dispatch({ type: "ADD_TO_CART", payload: product });
                }}
              >
                Add to Cart
              </Button>
            </Box>
            <Box>
              {selectedProducts?.filter((item) => item.id === product.id)
                .length > 0 ? (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CompareArrowsIcon />}
                >
                  In Compare
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CompareArrowsIcon />}
                  onClick={() => selectProducts(product)}
                >
                  Compare
                </Button>
              )}
            </Box>
          </Stack>
        </CardContent>
      )}
      <CardMedia
        component="img"
        image={thumbnail}
        alt="product image"
        sx={{
          height: 300,
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ zIndex: 10 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
          display="flex"
          justifyContent="space-between"
          height={60}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 550 }}>
              {title.slice(0, 52)}
            </Typography>
            <CategoryStyled>{category}</CategoryStyled>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {`€${price}`}
          </Typography>
        </Stack>
        <Rating sx={{ zIndex: 11 }} name="read-only" value={rating} readOnly />
      </CardContent>
    </Card>
  );
};

const CategoryStyled = styled(Typography)(
  ({ theme }) => `
   background-color: black;
   color: white;
   padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
   width: max-content;
   font-size: ${theme.spacing(1.5)};
   position: absolute;
   top: 5px;
   left: 5px;
   z-index: 102;
`
);

export default ProductCard;
