import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ProductComparisonOverlay = ({
  open,
  onClose,
  onRemoveProduct,
  products,
}) => {
  const [bestPrice, setBestPrice] = useState(null);
  const [bestDiscount, setBestDiscount] = useState(null);
  const [bestRating, setBestRating] = useState(null);

  useEffect(() => {
    getBestProduct(products);
  }, [products]);

  const getBestProduct = (products) => {
    setBestPrice(products && products.sort((a, b) => a.price - b.price)[0]);
    setBestDiscount(
      products &&
        products.sort((a, b) => b.discountPercentage - a.discountPercentage)[0]
    );
    setBestRating(products && products.sort((a, b) => b.rating - a.rating)[0]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Product Comparison</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: "10px", top: "10px" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {products.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price (€)</TableCell>
                <TableCell>Discount (%)</TableCell>
                <TableCell>Rating (5)</TableCell>
                <TableCell>Analysis</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, key) => (
                <TableRow key={key}>
                  <TableCell>
                    <img
                      src={product.thumbnail}
                      height={80}
                      width={100}
                      alt={product.title}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.discountPercentage}</TableCell>
                  <TableCell>{product.rating}</TableCell>
                  <TableCell>
                    {bestPrice?.price === product.price && (
                      <Chip label={`Cheapest`} color="success" />
                    )}
                    {bestDiscount?.discountPercentage ===
                      product.discountPercentage && (
                      <Chip label={`Best Discount`} color="success" />
                    )}
                    {bestRating?.rating.toFixed(1) ===
                      product.rating.toFixed(1) && (
                      <Chip label={`Best Rating`} color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        onRemoveProduct(product.id);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Alert severity="info">Please Select Products for Comparison</Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparisonOverlay;
