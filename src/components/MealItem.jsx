import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";

import Button from "./UI/Button";
import { MealsContext } from "../store/meals-cart-context";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function MealItem({ meal }) {
  const mealCtx = useContext(MealsContext);

  function handleAddMeal() {
    mealCtx.addMealToCart(meal);
    toast.success("Added item!");
  }

  return (
    <>
      <li className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-description">{meal.description}</p>
            <p className="meal-item-price">
              {currencyFormatter.format(meal.price)}
            </p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={handleAddMeal}>Add to cart</Button>
          </p>
        </article>
      </li>
    </>
  );
}
