import { useContext } from "react";
import Button from "./Button";
import CartModal from "./CartModal";
import CartItem from "./CartItem";
import { MealsContext } from "../store/meals-cart-context";
import { currencyFormatter } from "../formatting";
import { ProgressContext } from "../store/progress-cart-context";

export default function Cart({}) {
  const { items, addMealToCart, removeMealToCart } = useContext(MealsContext);
  const { step, closeCart } = useContext(ProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    closeCart();
  }

  return (
    <CartModal
      className="cart"
      open={step === "cart"}
      onClose={step === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            return (
              <CartItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onIncrease={() => addMealToCart(item)}
                onDecrease={() => removeMealToCart(item.id)}
              />
            );
          })}
        </ul>
      )}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <div className="modal-actions">
        <Button onlyText onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && <Button>Go to Checkout</Button>}
      </div>
    </CartModal>
  );
}
