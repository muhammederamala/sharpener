import React from 'react';

function Product(props) {
  const { products } = props;

  return (
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card" style={{ width: '18rem' }}>
            <img src={product.imageUrl} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Price: ${product.price}</p>
              {/* You can add more details or features here */}
              <a href="#" className="btn btn-primary">
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
