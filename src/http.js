export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const meals = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch meals.");
  }

  return meals;
}

export async function updateMealsOrders({ items, customer }) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order: { items, customer } }),
    headers: { "Content-Type": "application/json" },
  });
  const ordersData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update orders.");
  }
  return ordersData.message;
}

export async function fetchAvailableOrders() {
  const response = await fetch("http://localhost:3000/orders");
  const orders = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch orders.");
  }

  return orders;
}
