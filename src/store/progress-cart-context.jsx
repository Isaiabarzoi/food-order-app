import { createContext, useState } from "react";

export const ProgressContext = createContext({
  step: "",
  openCart: () => {},
  closeCart: () => {},
});

export default function ProgressContextProvider({ children }) {
  const [progressStep, setProgressStep] = useState("");

  function openCart() {
    setProgressStep("cart");
  }

  function closeCart() {
    setProgressStep("");
  }

  const progressCtx = {
    step: progressStep,
    openCart,
    closeCart,
  };

  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}
