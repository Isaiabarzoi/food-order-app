import Header from "./components/Header";
import Meals from "./components/Meals";
import MealsContextProvider from "./store/meals-cart-context";

function App() {
  return (
    <MealsContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </MealsContextProvider>
  );
}

export default App;
