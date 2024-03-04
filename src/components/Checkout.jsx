import { useContext, useState } from "react";
import Button from "./Button";
import CartModal from "./CartModal";
import Input from "./Input";
import { ProgressContext } from "../store/progress-cart-context";
import { updateMealsOrders } from "../http";
import { MealsContext } from "../store/meals-cart-context";

export default function Checkout() {
  const { items } = useContext(MealsContext);
  const { step, closeCheckout, openCompletedOrder } =
    useContext(ProgressContext);

  const [formData, setFormData] = useState({
    enteredName: "",
    enteredEmail: "",
    enteredStreet: "",
    enteredPostalCode: "",
    enteredCity: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const inputData = {
      name: formData.enteredName,
      email: formData.enteredEmail,
      street: formData.enteredStreet,
      "postal-code": formData.enteredPostalCode,
      city: formData.enteredCity,
    };
    console.log(inputData);
    console.log(items);
    try {
      await updateMealsOrders({ items: items, customer: inputData });
    } catch (error) {
      console.error("Failed to update orders:", error);
    }
    setFormData({
      enteredName: "",
      enteredEmail: "",
      enteredStreet: "",
      enteredPostalCode: "",
      enteredCity: "",
    });
    openCompletedOrder();
  }

  function handleClose() {
    closeCheckout();
  }

  return (
    <CartModal
      open={step === "checkout"}
      onClose={step == "checkout" ? handleClose : null}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: </p>
        <Input
          label="Full Name"
          type="tex"
          id="full-name"
          name="enteredName"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="E-Mail Adress"
          type="email"
          id="email"
          name="enteredEmail"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          name="enteredStreet"
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            name="enteredPostalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          <Input
            label="City"
            type="text"
            id="city"
            name="enteredCity"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <p className="modal-actions">
          <Button onlyText onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Submit Order</Button>
        </p>
      </form>
    </CartModal>
  );
}
