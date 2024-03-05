import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import Loader from "./UI/Loader";
import Button from "./UI/Button";

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
  const [sortedMeals, setSortedMeals] = useState(availableMeals);
  const [sortBy, setSortBy] = useState("Default");

  useEffect(() => {
    if (availableMeals) {
      setSortedMeals([...availableMeals]);
    }
  }, [availableMeals]);

  function handleOpenHistoryOrder() {
    setShowHistory(true);
  }

  function handleSortChange(e) {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);
    let sortedMeals = [...availableMeals];
    if (selectedOption === "From most expensive") {
      sortedMeals.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "From the cheapest") {
      sortedMeals.sort((a, b) => a.price - b.price);
    }
    setSortedMeals(sortedMeals);
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
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="select-actions"
        >
          <option value="Default">Default</option>
          <option value="From most expensive">From most expensive</option>
          <option value="From the cheapest">From the cheapest</option>
        </select>
      </div>
      <ul id="meals">
        {sortedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
