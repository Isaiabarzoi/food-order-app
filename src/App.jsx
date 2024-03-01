import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import MealsContextProvider from "./store/meals-cart-context";
import ProgressContextProvider from "./store/progress-cart-context";

function App() {
  return (
    <ProgressContextProvider>
      <MealsContextProvider>
        <Header />
        <Meals />
        <Cart />
      </MealsContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
