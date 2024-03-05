import { useContext, useState } from "react";

import logo from "../assets/logo.jpg";
import Button from "./Button";
import { MealsContext } from "../store/meals-cart-context";
import { ProgressContext } from "../store/progress-cart-context";
import HistoryOrders from "./HistoryOrders";

export default function Header() {
  const { items } = useContext(MealsContext);
  const { openCart } = useContext(ProgressContext);

  const cartQuantity = items.length;

  function handleOpenCart() {
    openCart();
  }

  return (
    <>
      <header id="main-header">
        <h1 id="title">
          <img src={logo} alt="Logo restaurant" />
          Reactfood
        </h1>
        <div>
          <Button onlyText onClick={handleOpenCart}>
            Cart ({cartQuantity})
          </Button>
        </div>
      </header>
    </>
  );
}
