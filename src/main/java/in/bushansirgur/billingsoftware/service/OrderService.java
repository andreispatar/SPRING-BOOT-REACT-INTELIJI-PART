package in.bushansirgur.billingsoftware.service;

import in.bushansirgur.billingsoftware.io.OrderRequest;
import in.bushansirgur.billingsoftware.io.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();
}
