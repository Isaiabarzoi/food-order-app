import { createContext, useReducer } from "react";

export const MealsContext = createContext({
  items: [],
  addMealToCart: (item) => {},
  removeMealToCart: (id) => {},
  clearCart: (id) => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );

    if (existingCartItemIndex > -1) {
      const existingCartItem = updatedItems[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export default function MealsContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function addMealToCart(item) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeMealToCart(id) {
    shoppingCartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart(id) {
    shoppingCartDispatch({
      type: "CLEAR_CART",
      id,
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addMealToCart,
    removeMealToCart,
    clearCart,
  };

  return (
    <MealsContext.Provider value={ctxValue}>{children}</MealsContext.Provider>
  );
}
