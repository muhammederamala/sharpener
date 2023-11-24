import react,{Fragment} from "react";

import Products from "./components/Products";
import Navbar from "./Header/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Products />
    </Fragment>
  );
}

export default App;
