import React, { useContext } from "react";
import CartContext from "../store/cart-context";

function CartIcon() {
  const { totalQty } = useContext(CartContext);

  return (
    <div
      style={{
        background: "white",
        color: "black",
        width: "70px",
        borderRadius: "10%",
        padding: "5px",
        textAlign: "center",
      }}
    >
      <i
        className="material-icons"
        style={{ background: "white", color: "black" }}
      >
        shopping_cart
      </i>
      <span>{totalQty}</span>
    </div>
  );
}

export default CartIcon;
