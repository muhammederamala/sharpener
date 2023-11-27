import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 


import AuthContext from '../store/auth-context'
import CartContext from '../store/cart-context';

function Product(props) {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext)

  const { products } = props;

  const addToCartHandler = (product) => {
    cartCtx.addToCart(product,authCtx.email);
  };

  return (
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <Card style={{ width: '18rem' }}>
            {product.imageUrl && (
              <Link to={`/store/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
              </Link>
            )}
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Button variant="primary" onClick={() => addToCartHandler(product)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Product;
