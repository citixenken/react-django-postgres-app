import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

//import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

//import products from "../products";

function HomeScreen() {
  //const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    // async function fetchProducts() {
    //   //proxy key in package.json handles localhost - no hardcoding url
    //   const { data } = await axios.get("/api/products/");
    //   setProducts(data);
    // }
    // fetchProducts();

    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
