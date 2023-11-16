import React, { useState } from "react";

function AddProduct({onProductAdded}) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedProducts = localStorage.getItem("Products");
    let lastId = 0;
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
        const lastProduct = parsedProducts[parsedProducts.length - 1];
        lastId = parseInt(lastProduct.id, 10);
      }
    }

    const product = {
      id: lastId + 1,
      name: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
    };

    const existingProducts = JSON.parse(localStorage.getItem("Products")) || [];
    existingProducts.push(product);

    localStorage.setItem("Products", JSON.stringify(existingProducts));

    onProductAdded()
    
    setProductCategory ('')
    setProductDescription ('')
    setProductName('')
    setProductPrice('')
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            className="form-control"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            className="form-control"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCategory">Product Category:</label>
          <select
            id="productCategory"
            className="form-control"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value=''>select category</option>
            <option value="food">Food</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
