import React,{useState} from 'react';

import AddProduct from './components/AddProduct';
import Products from './components/Products';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(false);

  const handleProductAdded = () => {
    setRefreshProducts(!refreshProducts);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <AddProduct onProductAdded={handleProductAdded} />
        </div>
        <div className="col-md-8">
          <Products refresh={refreshProducts}/>
        </div>
      </div>
    </div>
  );
}

export default App;
