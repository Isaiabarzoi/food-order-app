import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import MealsContextProvider from "./store/meals-cart-context";
import ProgressContextProvider from "./store/progress-cart-context";
import Checkout from "./components/Checkout";

function App() {
  return (
    <ProgressContextProvider>
      <MealsContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </MealsContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
