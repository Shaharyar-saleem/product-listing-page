import React from "react";
import {
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
} from "@mui/material";

const productCard = ({ product }) => {
  const { category, thumbnail, price, title, description } = product;
  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        image={thumbnail}
        alt="product image"
        sx={{
          height: 300,
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
          display="flex"
          justifyContent="space-between"
          height={70}
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
`
);

export default productCard;