import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 
import CartContext from '../store/cart-context';

function ProductDetails(props) {
  const cartCtx = useContext(CartContext);

  const { product } = props;
  const addToCartHandler = () => {
    cartCtx.addToCart(product);
  };

  return (
    <div className="container mt-4">
      <Card>
        <div className="row no-gutters">
          <div className="col-md-6">
            <Card.Img variant="top" src={product[0].imageUrl} alt={product[0].title} />
          </div>
          <div className="col-md-6">
            <Card.Body>
              <Card.Title>{product[0].title}</Card.Title>
              <Card.Text>Price: ${product[0].price}</Card.Text>
              <Button variant="primary" onClick={addToCartHandler}>
                Add to Cart
              </Button>
            </Card.Body>
          </div>
        </div>
      </Card>
      <Link to="/store" className="btn btn-secondary mt-3">
        Back to Store
      </Link>
    </div>
  );
}

export default ProductDetails;
