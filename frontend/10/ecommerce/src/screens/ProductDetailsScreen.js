import React, { Fragment, useContext } from "react";
import { useParams } from "react-router";

import ProductDetails from "../components/ProductDetails";
import ProductContext from "../store/product-context";

function ProductDetailsScreen() {
  const productCtx = useContext(ProductContext);
  const { id } = useParams();

  const product = productCtx.products.filter((product) => product.id == id)
  return (
  <Fragment>
    <ProductDetails product={product} />
  </Fragment>
  );
}

export default ProductDetailsScreen;
