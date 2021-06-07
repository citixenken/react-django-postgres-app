import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
    Row,
    Col,
    Button,
    ListGroup,
    Image,
    Card,
    Form,
    Table,
    ListGroupItem,
} from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;

    useEffect(() => {
        //DO NOT dispatch above unless Admin
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    const deleteHandler = (id) => {
        //confirm before deletion
        if (window.confirm("Are you sure you want to delete this product?")) {
            //delete products
        }
    };

    const createProductHandler = (product) => {};
    //create product
    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"> Create Product</i>
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped responsive hover bordered classname="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProductListScreen;
