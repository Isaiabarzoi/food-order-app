import { useContext, useState } from "react";
import Button from "./UI/Button";
import CartModal from "./UI/CartModal";
import Input from "./UI/Input";
import CompletedOrder from "./CompletedOrder";
import Error from "./Error";
import { ProgressContext } from "../store/progress-cart-context";
import { MealsContext } from "../store/meals-cart-context";
import useHttp from "../hooks/useHttp";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const { items, clearCart } = useContext(MealsContext);
  const { step, closeCheckout } = useContext(ProgressContext);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    config
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  function handleCheckout() {
    closeCheckout();
    clearCart();
    clearData();
  }

  function handleClose() {
    closeCheckout();
  }

  let actions = (
    <>
      <Button onlyText onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending orders...</span>;
  }

  if (!error && data) {
    return (
      <CartModal open={step === "checkout"} onClose={handleCheckout}>
        <CompletedOrder onFinish={handleCheckout} />
      </CartModal>
    );
  }

  return (
    <CartModal open={step === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </CartModal>
  );
}
