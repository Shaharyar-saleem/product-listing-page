import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Grid, Box, Button, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import ProductComparisonOverlay from "../../components/ProductComparisonOverlay";
import FilterDropdown from "../../components/input/FilterDropdown";
import ProductCard from "../../components/card/ProductCard";
import Layout from "../../components/Layout";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const filters = ["Price Descending", "Price Ascending", "Discount", "Rating"];

  useEffect(() => {
    /**
     * setTimeout is added just to make loading
     */
    setTimeout(() => {
      fetchProducts();
    }, 100);
  }, [page, selectedFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?&page=${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responseJson = await response.json();
      const newProducts = responseJson.products;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      if (selectedFilter === "Price Ascending") {
        const sortedProducts = [...products, ...newProducts].sort(
          (a, b) => a.price - b.price
        );
        setProducts(sortedProducts);
      }
      if (selectedFilter === "Price Descending") {
        const sortedProducts = [...products, ...newProducts].sort(
          (a, b) => b.price - a.price
        );
        setProducts(sortedProducts);
      }
      if (selectedFilter === "Rating") {
        const sortedProducts = [...products, ...newProducts].sort(
          (a, b) => b.rating - a.rating
        );
        setProducts(sortedProducts);
      }
      if (selectedFilter === "Discount") {
        const sortedProducts = [...products, ...newProducts].sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
        setProducts(sortedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedProducts = (products) => {
    setSelectedProducts([...selectedProducts, products]);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOverlayClose = () => {
    setOverlayOpen(false);
  };

  const handleRemoveProduct = (productId) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedSelectedProducts);
  };

  return (
    <Layout>
      <Box display="flex" justifyContent={{ xs: "center", md: "flex-end" }}>
        <Stack spacing={2} direction="row">
          <Button
            height={56}
            onClick={() => {
              setOverlayOpen(true);
            }}
            variant="outlined"
          >
            {`Compare (${selectedProducts?.length})`}
          </Button>
          <FilterDropdown
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </Stack>
      </Box>

      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={true}
        loader={
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <CircularProgress />
          </h4>
        }
      >
        <ProductComparisonOverlay
          open={overlayOpen}
          onClose={handleOverlayClose}
          onRemoveProduct={handleRemoveProduct}
          products={selectedProducts}
        />
        <Grid container spacing={4} mt={2}>
          {products.map((product, key) => {
            return (
              <Grid key={key} lg={4} md={6} sm={12} xs={12} item>
                <ProductCard
                  product={product}
                  selectProducts={handleSelectedProducts}
                  selectedProducts={selectedProducts}
                />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </Layout>
  );
};

export default Index;
