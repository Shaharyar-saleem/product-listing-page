import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const productCard = ({ product }) => {
  const { category, image, price, title, description } = product;
  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
        alt="product image"
        sx={{
          height: 200,
          objectFit: "contain",
        }}
      />
      {/* <img src={image} width={150} height={70}></img> */}
      <CardContent>
        <Typography variant="h6">{title.slice(0, 52)}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {price}
        </Typography>
        <Typography variant="body2">{description.slice(0, 150)}</Typography>
      </CardContent>
    </Card>
  );
};

export default productCard;