import React from 'react'

import ProductCategory from './ProductCategory'

function Products(props) {
  const products = JSON.parse(localStorage.getItem('Products')) || []

  const foodProducts = products.filter((product) => product.category === 'food');
  const electronicsProducts = products.filter((product) => product.category === 'electronics');
  const clothingProducts = products.filter((product) => product.category === 'clothing');
  const booksProducts = products.filter((product) => product.category === 'books');

  console.log(products)

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <ProductCategory category="Food" products={foodProducts} />
        </div>
        <div className="col-md-6 mb-3">
          <ProductCategory category="Electronics" products={electronicsProducts} />
        </div>
        <div className="col-md-6 mb-3">
          <ProductCategory category="Clothing" products={clothingProducts} />
        </div>
        <div className="col-md-6 mb-3">
          <ProductCategory category="Books" products={booksProducts} />
        </div>
      </div>
    </div>
  );
}

export default Products
