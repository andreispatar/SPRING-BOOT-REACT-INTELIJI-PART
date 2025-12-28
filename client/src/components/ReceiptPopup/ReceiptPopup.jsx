import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./ReceiptPopup.css";

const ReceiptPopup = ({
  onClose = () => {},
  onCash = () => {},
  onCard = () => {},
}) => {
  const { cartItems } = useContext(AppContext);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="receipt-popup">
      <div className="receipt-popup__backdrop" onClick={onClose} />
      <div className="receipt-popup__content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Select payment method</h5>
          <span className="badge bg-warning text-dark">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center summary-row mb-3">
          <span className="text-secondary">Total</span>
          <strong>&#8364; {totalAmount.toFixed(2)}</strong>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-success flex-fill"
            type="button"
            onClick={onCash}
          >
            Cash
          </button>
          <button
            className="btn btn-primary flex-fill"
            type="button"
            onClick={onCard}
          >
            Card
          </button>
        </div>
        <button
          className="btn btn-link text-light mt-3 p-0"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptPopup;
