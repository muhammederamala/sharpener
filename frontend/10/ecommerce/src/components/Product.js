import React, { useContext } from 'react';

import CartContext from '../store/cart-context';

function Product(props) {
  const cartCtx = useContext(CartContext)

  const { products } = props;

  const addToCartHandler = (product) => {
    cartCtx.addToCart(product)
  };

  return (
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card" style={{ width: '18rem' }}>
            <img src={product.imageUrl} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Price: ${product.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
