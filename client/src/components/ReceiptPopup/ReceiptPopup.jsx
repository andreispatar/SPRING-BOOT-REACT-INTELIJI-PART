import "./ReceiptPopup.css";
import "./Print.css"

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
  const details = orderDetails || {};
  const items = details.items || [];
  const formatMoney = (value) => Number(value || 0).toFixed(2);
  const paymentMethod = (details.paymentMethod || details.payment || "").toUpperCase();

  if (!orderDetails) return null; // safety guard

  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success fs-1"></i>
        </div>
        <h3 className="text-center mb-4">Order Receipt</h3>
        <p>
          <strong>Order ID:</strong> {details.orderId}
        </p>
        <p>
          <strong>Name:</strong> {details.customerName}
        </p>
                  <p>
            <strong>Phone:</strong> {details.phoneNumber}
          </p>
          <hr className="my-3" />
          <h5 className="mb-3">Items Ordered</h5>
          <div className="cart-items-scrolable">
            {items.map((item, index) => (
                <div key={index} className="d-flex jsutify-content-between mb-2">
                  <span>{item.name} x {item.quantity ?? item.qty ?? item.cuantity ?? 1}</span>
                  <span>&#8364;{formatMoney((item.price || 0) * (item.quantity || item.qty || item.cuantity || 1))}</span>
                </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="d-flex justify-content-between mb-2">
            <span>
              <strong>Subtotal:</strong>
            </span>
            <span>&#8364;{formatMoney(details.subtotal)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>
              <strong>Tax (1%):</strong>
            </span>
            <span>&#8364;{formatMoney(details.tax)}</span>  
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span>
              <strong>Grand Total:</strong>
            </span>
            <span>&#8364;{formatMoney(details.grandTotal)}</span>  
          </div>
          <p>
            <strong>Payment Method: </strong> {paymentMethod}
          </p>
          {
            paymentMethod === "UPI" && (
              <>
              <p>
                <strong>Razorpay Order ID: </strong> {details.razorpayOrderId}
              </p>
                            <p>
                <strong>Razorpay Payment ID: </strong> {details.razorpayPaymentId}
              </p>
              </>
            )
          }
          <div className="d-flex jsutify-content-end gap-3 mt-4">
            <button className="btn btn-warning" onClick={onPrint}>Print Receipt</button>
            <button className="btn btn-danger" onClick={onClose}>Close</button>
          </div>
      </div>
    </div>
  )
};

export default ReceiptPopup;
