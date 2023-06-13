import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "../../components/card/ProductCard";
import FilterDropdown from "../../components/input/FilterDropdown";
import Layout from "../../components/Layout";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    /**
     * setTimeout is added just to make loading
     */
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, [page, selectedFilter]);

  const fetchProducts = async () => {
    console.log("page number:", page);
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
      // if (products.length >= 50) {
      //   setHasMore(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filters = ["Price Descending", "Price Ascending", "Discount", "Rating"];

  return (
    <Layout>
      <Box display="flex" justifyContent="flex-end">
        <FilterDropdown
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
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
        <Grid container spacing={4} mt={2}>
          {products.map((product, key) => {
            return (
              <Grid key={key} lg={4} md={6} sm={12} xs={12} item>
                <ProductCard product={product} />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </Layout>
  );
};

export default Index;
