import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Button,
    ListGroup,
    Image,
    Card,
    Form,
    ListGroupItem,
} from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);

    //destructuring orderScreen
    const { order, error, loading } = orderDetails;

    if (!loading && !error) {
        //calculations below are dynamic for this page ONLY!
        //They don't update our store
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);

        order.shippingPrice = (order.itemsPrice > 1000 ? 0 : 10).toFixed(2);
        order.taxPrice = Number(0.16 * order.itemsPrice).toFixed(2);
        order.totalPrice = (
            Number(order.itemsPrice) +
            Number(order.shippingPrice) +
            Number(order.taxPrice)
        ).toFixed(2);
    }

    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto: ${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>Shipping To: </strong>
                                {order.shippingAddress.address},{"  "}
                                {order.shippingAddress.city},{"  "}
                                {order.shippingAddress.postalCode},{"  "}
                                {order.shippingAddress.country},{"  "}
                            </p>

                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Not Delivered.
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Paid.</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">
                                    Order is empty.
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={4}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>

                                                <Col md={4}>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X {item.price} =
                                                    $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price: </Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>TOTAL: </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;
