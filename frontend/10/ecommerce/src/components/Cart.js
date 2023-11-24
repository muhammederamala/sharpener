import React from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

function Cart({ showModal, handleClose }) {
  const cartElements = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 2,
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 3,
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 1,
    },
  ];

  const handleRemoveItem = (index) => {
    // Add logic to remove item from the cart
    console.log(`Remove item at index ${index}`);
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <h1 className="modal-title fs-5">Shopping Cart</h1>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {cartElements.map((item, index) => (
            <Col key={index} md={6}>
              <Card style={{ marginBottom: '30px', position: 'relative' }}>
                <Card.Img variant="top" src={item.imageUrl} style={{ height: '200px' }} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    Price: ${item.price}
                    <br />
                    Quantity: {item.quantity}
                  </Card.Text>
                  <Button
                  variant="danger"
                  className="remove-icon"
                  onClick={() => handleRemoveItem(index)}
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Proceed to Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;
