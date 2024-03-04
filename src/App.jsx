import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import MealsContextProvider from "./store/meals-cart-context";
import ProgressContextProvider from "./store/progress-cart-context";
import Checkout from "./components/Checkout";
import CompletedOrder from "./components/CompletedOrder";
import HistoryOrders from "./components/HistoryOrders";

function App() {
  return (
    <ProgressContextProvider>
      <MealsContextProvider>
        <Header />
        {/* <HistoryOrders /> */}
        <Meals />
        <Cart />
        <Checkout />
        <CompletedOrder />
      </MealsContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
