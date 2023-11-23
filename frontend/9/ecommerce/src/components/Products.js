import React, { useContext, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import ProductContext from "../store/product-context";

function Products() {
  const { products } = useContext(ProductContext);
  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size for each product

  const handleSizeChange = (productId, size) => {
    // Update the selected size for the corresponding product
    setSelectedSize((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const handleAddToCart = (productId) => {
    // Handle adding the product to the cart with selected size
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    console.log(
      "Add to Cart:",
      selectedProduct,
      "Selected Size:",
      selectedSize[productId]
    );
    // Add your logic to update the cart state or perform other actions
  };

  return (
    <div className="container mb-4" style={{ minHeight: "200px" }}>
      <h2 className="mt-4">Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.tshirtName}</Card.Title>
                  <Card.Text>
                    {product.description}, <strong>${product.price}</strong>
                  </Card.Text>
                  <Form>
                    <Form.Group controlId={`sizeSelect_${product.id}`}>
                      <Form.Label>Select Size:</Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedSize[product.id] || ""}
                        onChange={(e) =>
                          handleSizeChange(product.id, e.target.value)
                        }
                      >
                        <option value="">-- Select Size --</option>
                        <option value="small">Small ({product.smallStock})</option>
                        <option value="medium">Medium ({product.mediumStock})</option>
                        <option value="large">Large ({product.largeStock})</option>
                      </Form.Control>
                    </Form.Group>
                    <Button
                      className="mt-2"
                      variant="primary"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!selectedSize[product.id]}
                    >
                      Add to Cart
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Products;
