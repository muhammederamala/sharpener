import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ProductContext from '../store/product-context';

function AddProductForm() {
  const ProductCtx = useContext(ProductContext);

  const [formData, setFormData] = useState({
    tshirtName: '',
    description: '',
    price: '',
    largeStock: '',
    mediumStock: '',
    smallStock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = uuidv4();

    ProductCtx.addProduct({
      id: productId,
      tshirtName: formData.tshirtName,
      description: formData.description,
      price: formData.price,
      largeStock: formData.largeStock,
      mediumStock: formData.mediumStock,
      smallStock: formData.smallStock,
    });

    setFormData({
      tshirtName: '',
      description: '',
      price: '',
      largeStock: '',
      mediumStock: '',
      smallStock: '',
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <div className="card p-4 border-1">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-sm-6">
              <label className="form-label">T-Shirt Name:</label>
              <input
                type="text"
                className="form-control border-2"
                name="tshirtName"
                value={formData.tshirtName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control border-2"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4">
              <label className="form-label">Price:</label>
              <input
                type="number"
                className="form-control border-2"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-4">
              <label className="form-label">Large Stock:</label>
              <input
                type="number"
                className="form-control border-2"
                name="largeStock"
                value={formData.largeStock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-4">
              <label className="form-label">Medium Stock:</label>
              <input
                type="number"
                className="form-control border-2"
                name="mediumStock"
                value={formData.mediumStock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4">
              <label className="form-label">Small Stock:</label>
              <input
                type="number"
                className="form-control border-2"
                name="smallStock"
                value={formData.smallStock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
