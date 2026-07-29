using ECommerce.Application.DTOs.Orders;
using ECommerce.Application.Services.Carts;
using Microsoft.Extensions.Configuration;
namespace ECommerce.Application.Services.Orders;

public class OrderService : IOrderService
{
    private readonly IConfiguration _configuration;
    private readonly ICartService _cartService;
    private readonly IOrderRepository _orderRepository;
    private readonly IPaymentService _paymentService;
    private readonly ICartRepository _cartRepository;

    public OrderService(IOrderRepository orderRepository, IPaymentService paymentService, ICartRepository cartRepository, IConfiguration configuration, ICartService cartService)
    {
        _orderRepository = orderRepository;
        _paymentService = paymentService;
        _cartRepository = cartRepository;
        _configuration = configuration;
        _cartService = cartService;
    }

    public async Task<CheckoutResponseDto> CreateCheckoutSessionAsync(string userId, CreateOrderDto createOrderDto)
    {
        var userCart = await _cartRepository.GetCartByUserIdAsync(userId);
        if (userCart == null)
        {
            throw new KeyNotFoundException("Cart not found for the user.");
        }
        var cartWithItems = await _cartRepository.GetCartWithItemsAsync(userCart.Id);
        if (cartWithItems == null || !cartWithItems.CartItems.Any())
        {
            throw new KeyNotFoundException("Cart is empty.");
        }
        var order = new Order
        {
            UserId = userId,
            ShippingFullName = createOrderDto.ShippingFullName,
            ShippingPhoneNumber = createOrderDto.ShippingPhoneNumber,
            ShippingStreet = createOrderDto.ShippingStreet,
            ShippingCity = createOrderDto.ShippingCity,
            ShippingState = createOrderDto.ShippingState,
            ShippingPostalCode = createOrderDto.ShippingPostalCode,
            Status = OrderStatus.Pending,
            OrderDate = DateTime.UtcNow,
            TotalAmount = cartWithItems.CartItems.Sum(ci => ci.Product.GetUnitPrice(ci.Quantity) * ci.Quantity),

        };
        foreach (var cartItem in cartWithItems.CartItems)
        {
            order.OrderItems.Add(new OrderItem
            {
                ProductTitleSnapshot = cartItem.Product.Title,
                Quantity = cartItem.Quantity,
                UnitPriceAtPurchase = cartItem.Product.GetUnitPrice(cartItem.Quantity),
                Product = cartItem.Product,
                Order = order
            });
        }

        var successUrl = _configuration["Frontend:SuccessUrl"]
    ?? throw new InvalidOperationException("Frontend:SuccessUrl is not configured.");
        var cancelUrl = _configuration["Frontend:CancelUrl"]
            ?? throw new InvalidOperationException("Frontend:CancelUrl is not configured.");


        await _orderRepository.AddAsync(order);
        await _orderRepository.SaveChangesAsync();
        var result = await _paymentService.CreateCheckoutSessionAsync(order, successUrl, cancelUrl);
        order.StripeSessionId = result.SessionId;
        _orderRepository.Update(order);
        await _orderRepository.SaveChangesAsync();
        return new CheckoutResponseDto(result.CheckoutUrl);
    }

    public async Task MarkOrderAsPaidAsync(string sessionId)
    {
        var order = await _orderRepository.GetOrderByStripeSessionIdAsync(sessionId);
        if (order == null)
        {
            throw new KeyNotFoundException("Order not found for the given session ID.");
        }
        if (order.Status != OrderStatus.Pending)
        {
            return;
        }
        order.Status = OrderStatus.Paid;
        _orderRepository.Update(order);
        await _orderRepository.SaveChangesAsync();
        var cart = await _cartRepository.GetCartByUserIdAsync(order.UserId);
        if (cart != null)
        {
            await _cartService.ClearCartAsync(order.UserId);
        }
    }
}

