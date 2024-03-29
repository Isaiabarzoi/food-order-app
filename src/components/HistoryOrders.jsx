import { useState } from "react";
import Loader from "./UI/Loader";
import Button from "./UI/Button";
import HistoryItem from "./HistoryItem";
import Meals from "./Meals";
import Error from "./Error";
import useHttp from "../hooks/useHttp";

const config = {};

export default function HistoryOrders() {
  const [showMeals, setShowMeals] = useState(false);

  const {
    data: availableOrders,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/orders", config, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error title="Failed to fetch orders" message={error} />;
  }

  function handleOpenMeals() {
    setShowMeals(true);
  }

  if (showMeals) {
    return <Meals />;
  }

  return (
    <>
      <div className="history-action">
        <Button onClick={handleOpenMeals}>Meals</Button>
      </div>
      <table id="history">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Street</th>
            <th>Postal Code</th>
            <th>City</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <HistoryItem availableOrders={availableOrders} />
      </table>
    </>
  );
}
