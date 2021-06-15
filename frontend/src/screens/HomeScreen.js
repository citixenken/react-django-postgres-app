import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

//import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

//import products from "../products";

function HomeScreen({ history }) {
    //const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { products, loading, error, page, pages } = productList;

    let keyword = history.location.search;

    useEffect(() => {
        // async function fetchProducts() {
        //   //proxy key in package.json handles localhost - no hardcoding url
        //   const { data } = await axios.get("/api/products/");
        //   setProducts(data);
        // }
        // fetchProducts();

        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <div>
            <h1>Latest Products</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
