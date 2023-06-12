import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ProductCard from "../../components/card/ProductCard";
import Layout from "../../components/Layout";

const Index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const products = await response.json();
      setProducts(products);
      console.log("products:", products);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout maxWidth="xl">
      <Grid container spacing={4} mt={2}>
        {products.map((product) => {
          return (
            <Grid key={product.id} lg={3} md={6} xs={12} item>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default Index;
