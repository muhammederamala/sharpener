import React from 'react';

import AddProduct from './components/AddProduct';
import Products from './components/Products';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <AddProduct />
        </div>
        <div className="col-md-8">
          <Products/>
        </div>
      </div>
    </div>
  );
}

export default App;
