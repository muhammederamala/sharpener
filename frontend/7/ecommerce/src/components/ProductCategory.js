import React from "react";

function ProductCategory(props) {
  return (
    <div>
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body" style={{ minHeight: '200px' }}>
          <h5 className="card-title bg-info text-white p-2 ">{props.category}</h5>
          <ul className="list-group">
            {props.products.map((product) => (
              <li key={product.id} className="list-group-item">
                <h6 className="mb-0">{product.name}</h6>
                <p className="text-muted">${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
