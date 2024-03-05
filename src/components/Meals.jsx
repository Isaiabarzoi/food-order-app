import { useState } from "react";
import MealItem from "./MealItem";
import Loader from "./Loader";
import Button from "./Button";

import HistoryOrders from "./HistoryOrders";
import useHttp from "../hooks/useHttp";

const config = {};

export default function Meals() {
  const {
    data: availableMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);
  const [showHistory, setShowHistory] = useState(false);

  function handleOpenHistoryOrder() {
    setShowHistory(true);
  }

  if (error) {
    return <p>Failed to fetch meals</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (showHistory) {
    return <HistoryOrders />;
  }

  return (
    <>
      <div className="history-action">
        <Button onClick={handleOpenHistoryOrder}>Order History</Button>
      </div>
      <ul id="meals">
        {availableMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
