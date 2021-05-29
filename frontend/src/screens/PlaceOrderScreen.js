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
import Checkoutsteps from "../components/CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import {} from "../actions/cartActions";

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);

    //calculations below are dynamic for this page ONLY!
    //They don't update our store
    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);
    cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 10).toFixed(2);
    cart.taxPrice = Number(0.16 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const placeOrder = () => {
        console.log("Place Order");
    };
    // const { shippingAddress } = cart;

    // const dispatch = useDispatch();

    // const [address, setAddress] = useState(shippingAddress.address);
    // const [city, setCity] = useState(shippingAddress.city);
    // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    // const [country, setCountry] = useState(shippingAddress.country);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(saveShippingAddress({ address, city, postalCode, country }));
    //     history.push("/payment");
    // };

    return (
        <div>
            <Checkoutsteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping To: </strong>
                                {cart.shippingAddress.address},{"  "}
                                {cart.shippingAddress.city},{"  "}
                                {cart.shippingAddress.postalCode},{"  "}
                                {cart.shippingAddress.country},{"  "}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems === 0 ? (
                                <Message variant="info">
                                    Your cart is empty.
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>TOTAL: </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;
