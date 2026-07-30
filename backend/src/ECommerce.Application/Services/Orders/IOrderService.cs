using ECommerce.Application.DTOs.Orders;
namespace ECommerce.Application.Services.Orders;

public interface IOrderService
{
    Task<CheckoutResponseDto> CreateCheckoutSessionAsync(string userId, CreateOrderDto createOrderDto);
    Task MarkOrderAsPaidAsync(string sessionId);

    Task<IEnumerable<OrderDto>> GetOrdersByStatusAsync(OrderStatus? status);
    Task<OrderDto> UpdateOrderStatusAsync(int orderId, OrderStatus newStatus);
}