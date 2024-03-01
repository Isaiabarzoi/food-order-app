import { useState, useContext } from "react";
import logo from "../assets/logo.jpg";
import Cart from "./Cart";
import CartModal from "./CartModal";
import Button from "./Button";
import { MealsContext } from "../store/meals-cart-context";

export default function Header() {
  const { items } = useContext(MealsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const cartQuantity = items.length;

  function handleOpenCart() {
    setModalIsOpen(true);
  }

  return (
    <>
      <CartModal open={modalIsOpen}>
        <Cart />
      </CartModal>
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
