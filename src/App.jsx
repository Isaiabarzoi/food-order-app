import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import MealsContextProvider from "./store/meals-cart-context";
import ProgressContextProvider from "./store/progress-cart-context";
import Checkout from "./components/Checkout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ProgressContextProvider>
      <MealsContextProvider>
        <Header />
        <ToastContainer
          position="top-left"
          autoClose={3000}
          closeOnClick
          newestOnTop={false}
          theme="dark"
        />
        <Meals />
        <Cart />
        <Checkout />
      </MealsContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
