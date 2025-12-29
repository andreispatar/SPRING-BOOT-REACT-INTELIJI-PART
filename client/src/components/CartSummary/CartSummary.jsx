import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./CartSummary.css";
import toast from "react-hot-toast";
import { createOrder, deleteOrder } from "../../Service/OrderService";
import { createRazorpayOrder, verifyPayment } from "../../Service/PaymentService";
import { AppConstants } from "../../util/constants";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";

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
  const { cartItems , clearCart} = useContext(AppContext);

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

  const [orderDetails, setOrderDetails] = useState(null);

  const [showPopus, setShowPopus] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const clearAll = () =>{
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  }

  const placeOrder = () => {
      setShowPopus(true);
      clearAll();
  }

  const handlePrintReceipt = () => {
    window.print();
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
      try {
        await deleteOrder(orderId);
      }catch(error)
      {
        console.error(error);
        toast.error("Soemthing went wrong");
      }
  }

  const completePayment = async (paymentMode) => {
    if(!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }

    if(cartItems.length === 0){
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
        const orderData = {
        customerName,
        phoneNumber: mobileNumber,
        cartItems,
        subtotal: totalAmount,
        tax,
        grandTotal,
        paymentMethod: paymentMode.toUpperCase()
      }

    try {
        const response = await createOrder(orderData);
        const savedData = response.data;
        if(response.status === 201 && paymentMode === "cash"){
            toast.success("Cash received");
            setOrderDetails(savedData)
        }
        else if(response.status === 201 && paymentMode === "upi"){
            const razorpayLoaded = await loadRazorpayScript();
            if(!razorpayLoaded) {
              toast.error("Unable to load the razorpay");
              await deleteOrderOnFailure(savedData.orderId);
              return;
            }

            //create razorpay order
            let razorpayResponse;
            try {
              razorpayResponse = await createRazorpayOrder({
                amount: Math.round(grandTotal * 100), // smallest currency unit
                currency: "INR",
              });
            } catch (err) {
              const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.response?.data;
              console.error("createRazorpayOrder failed", err?.response || err);
              toast.error(
                backendMessage || "Unable to create Razorpay order (500)."
              );
              await deleteOrderOnFailure(savedData.orderId);
              return;
            }
            const options = {
              key: AppConstants.RAZORPAY_KEY_ID,
              amount: razorpayResponse.data.amount,
              currency: razorpayResponse.data.currency,
              order_id: razorpayResponse.data.id,
              name: "My Retail Shop",
              description: "Order Payment",
              handler : async function (response) {
                await verifyPaymentHandler(response, savedData);
              },
              prefill: {
                name: customerName,
                contact: mobileNumber
              },
              theme: {
                color: "#3399cc"
              },
              modal: {
                ondismiss: async () => {
                  await deleteOrderOnFailure(savedData.orderId);
                  toast.error("Payment cancelled");
                }
              },
            }
            const rzp =  new window.Razorpay(options);
            rzp.on("payment.failed", async (response) => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment failed");
              console.error(response.error.description);
            });
            rzp.open();
        }
    } catch (error) {
      console.error("Payment flow failed", error);
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.statusText;
      toast.error(backendMessage || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  }

  const verifyPaymentHandler = async (response, savedOrder) => {
  const paymentData = {
    razorpayOrderId: response.razorpay_order_id,
    razorpayPaymentId: response.razorpay_payment_id,
    razorpaySignature: response.razorpay_signature,
    orderId: savedOrder.orderId
  };

  try {
    const paymentResponse = await verifyPayment(paymentData);
    if (paymentResponse.status === 200) {
      toast.success("Payment successful");
      setOrderDetails({
        ...savedOrder,
        paymentDetails: {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature
        }
      });
    } else {
      toast.error("Payment processing failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Payment failed");
  }
};

 
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
          onClick={()=> completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          type="button"
          className="btn btn-primary text-light fw-bold flex-fill"
           onClick={()=> completePayment("upi")}
           disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Card"}
        </button>
      </div>
      <div>
        <button
        type="button"
        className="btn btn-warning text-dark fw-bold w-100 cart-summary__place-order"
        onClick={placeOrder}
        disabled={isProcessing || !orderDetails}
      >
        Place Order
      </button>
      {
        showPopus && (
          <ReceiptPopup 
            orderDetails={{
              ...orderDetails,
              razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
              razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
            }}
            onClose={()=> setShowPopus(false)}
            onPrint={handlePrintReceipt}
          />
        )
      }
      </div>
      
    </div>
  );
};

export default CartSummary;
