public interface IOrderRepository : IRepository<Order>
{
    Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    Task<Order?> GetOrderWithItemsAsync(int orderId);
    Task<Order?> GetOrderByStripeSessionIdAsync(string stripeSessionId);
}