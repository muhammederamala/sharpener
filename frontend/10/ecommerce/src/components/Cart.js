import React, { useContext } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import CartContext from "../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const cartElements = cartCtx.products;

  const handleRemoveItem = (id) => {
    cartCtx.removeFromCart(id);
  };
  return (
    <Modal show={cartCtx.showModal} onHide={cartCtx.hideCartHandler} size="lg">
      <Modal.Header closeButton>
        <h1 className="modal-title fs-5">Shopping Cart</h1>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {cartElements.map((item, index) => (
            <Col key={index} md={6}>
              <Card style={{ marginBottom: "30px", position: "relative" }}>
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    Price: ${item.price}
                    <br />
                    Quantity: {item.qty}
                  </Card.Text>
                  <Button
                    variant="danger"
                    className="remove-icon"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cartCtx.hideCartHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={cartCtx.hideCartHandler}>
          Proceed to Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;
