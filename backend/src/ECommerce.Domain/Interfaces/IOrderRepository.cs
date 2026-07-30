public interface IOrderRepository : IRepository<Order>
{
    Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    Task<Order?> GetOrderWithItemsAsync(int orderId);
    Task<Order?> GetOrderByStripeSessionIdAsync(string stripeSessionId);

    Task<decimal> GetTotalRevenueAsync();
    Task<int> GetOrderCountAsync();
    Task<Dictionary<OrderStatus, int>> GetOrderCountByStatusAsync();
    Task<IEnumerable<MonthlyRevenue>> GetMonthlyRevenueAsync(int months);
    Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus? status);

}
public record MonthlyRevenue(int Year, int Month, decimal Revenue);