import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import Loader from "./Loader";

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
          message: error.message || "Failed to fetch meals.",
        });
      }
      setIsFetching(false);
    }

    fetchMeals();
  }, []);

  return (
    <>
      <ul id="meals">
        {error && <p>An error occured!</p>}
        {!error && isFetching ? (
          // <p>Fetching meals...</p>
          <Loader />
        ) : (
          availableMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)
        )}
      </ul>
    </>
  );
}
