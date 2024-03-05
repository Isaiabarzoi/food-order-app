import { useContext } from "react";
import CartModal from "./CartModal";
import { ProgressContext } from "../store/progress-cart-context";
import Button from "./Button";

export default function CompletedOrder({ onFinish }) {
  const { step } = useContext(ProgressContext);

  return (
    <>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <p>
        <Button onClick={onFinish}>Okay</Button>
      </p>
    </>
  );
}
