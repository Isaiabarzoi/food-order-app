import { createContext, useState } from "react";

export const ProgressContext = createContext({
  step: "",
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

export default function ProgressContextProvider({ children }) {
  const [progressStep, setProgressStep] = useState("");

  function openCart() {
    setProgressStep("cart");
  }

  function closeCart() {
    setProgressStep("");
  }

  function openCheckout() {
    setProgressStep("checkout");
  }

  function closeCheckout() {
    setProgressStep("");
  }

  const progressCtx = {
    step: progressStep,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
  };

  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}
