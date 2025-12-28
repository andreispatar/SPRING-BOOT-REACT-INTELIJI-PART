package in.bushansirgur.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.bushansirgur.billingsoftware.io.OrderRequest;
import in.bushansirgur.billingsoftware.io.OrderResponse;
import in.bushansirgur.billingsoftware.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);
}
