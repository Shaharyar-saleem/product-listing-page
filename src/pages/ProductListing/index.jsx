import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "../../components/card/ProductCard";
import Layout from "../../components/Layout";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    /**
     * setTimeout is added just to make loading
     */
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, [page]);

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
      //   if (products.length >= 50) {
      //     setHasMore(false);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("products:", products);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Layout>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </h4>
        }
      >
        <Grid container spacing={6}>
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
