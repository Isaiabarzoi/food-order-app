import { currencyFormatter } from "../util/formatting";

export default function HistoryItem({ availableOrders }) {
  return (
    <tbody className="history-item">
      {availableOrders &&
        availableOrders.map((order) => {
          let totalPrice = 0;

          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer.name}</td>
              <td>{order.customer.email}</td>
              <td>{order.customer.street}</td>
              <td>{order.customer["postal-code"]}</td>
              <td>{order.customer.city}</td>
              <td>
                {order.items.map((item) => {
                  totalPrice += parseFloat(item.price);
                  return <p key={item.id}>{item.name}</p>;
                })}
              </td>
              <td>{currencyFormatter.format(totalPrice)}</td>
            </tr>
          );
        })}
    </tbody>
  );
}
