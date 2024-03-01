import { useContext } from "react";
import Button from "./Button";
import CartItem from "./CartItem";
import { MealsContext } from "../store/meals-cart-context";
import { currencyFormatter } from "../formatting";

export default function Cart({}) {
  const { items, addMealToCart, removeMealToCart } = useContext(MealsContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 && <p>No items in cart!</p>}
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
        <Button onlyText>Close</Button>
        <Button>Go to Checkout</Button>
      </div>
    </div>
  );
}
