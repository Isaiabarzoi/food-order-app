import { useState, useEffect } from "react";
import MealItem from "./MealItem";

import { fetchAvailableMeals } from "../http";

export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const meals = await fetchAvailableMeals();
        setAvailableMeals(meals);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch user places.",
        });
      }
      setIsFetching(false);
    }

    fetchMeals();
  }, []);

  return (
    <>
      {isFetching && <p>Fetching meals...</p>}
      {!isFetching && (
        <ul id="meals">
          {availableMeals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />;
          })}
        </ul>
      )}
    </>
  );
}
