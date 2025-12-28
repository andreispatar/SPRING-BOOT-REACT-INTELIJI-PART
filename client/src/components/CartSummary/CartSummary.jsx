import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./CartSummary.css";

const CartSummary = ({
  customerName = "",
  mobileNumber = "",
  setMobileNumber = () => {},
  setCustomerName = () => {},
  onCash = () => {},
  onCard = () => {},
  disableWhenEmpty = true,
  onPlaceOrder = () => {},
}) => {
  const { cartItems } = useContext(AppContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const isEmpty = totalItems === 0;

  return (
    <div className="cart-summary bg-dark text-light p-3 rounded d-flex flex-column gap-3 shadow-sm">
      <div className="summary-body">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>&#8364; {totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (1%)</span>
          <span>&#8364; {tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total-row">
          <span>Total</span>
          <span>&#8364; {grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="d-flex gap-2 cart-summary__actions">
        <button
          type="button"
          className="btn btn-success text-light fw-bold flex-fill"
          disabled={disableWhenEmpty && isEmpty}
          onClick={onCash}
        >
          Cash
        </button>
        <button
          type="button"
          className="btn btn-primary text-light fw-bold flex-fill"
          disabled={disableWhenEmpty && isEmpty}
          onClick={onCard}
        >
          Card
        </button>
      </div>
      <button
        type="button"
        className="btn btn-warning text-dark fw-bold w-100 cart-summary__place-order"
        disabled={disableWhenEmpty && isEmpty}
        onClick={onPlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default CartSummary;
