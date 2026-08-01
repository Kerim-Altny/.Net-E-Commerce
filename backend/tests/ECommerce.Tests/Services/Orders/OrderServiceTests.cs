using ECommerce.Application.Services.Carts;
using ECommerce.Application.Services.Orders;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;

namespace ECommerce.Tests.Services.Orders;

public class OrderServiceTests
{
    [Fact]
    public async Task UpdateOrderStatusAsync_ThrowsKeyNotFoundException_WhenOrderDoesNotExist()
    {
        // Arrange
        var orderRepositoryMock = new Mock<IOrderRepository>();
        orderRepositoryMock
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((Order?)null);

        var paymentServiceMock = new Mock<IPaymentService>();
        var cartRepositoryMock = new Mock<ICartRepository>();
        var cartServiceMock = new Mock<ICartService>();
        var configurationMock = new Mock<IConfiguration>();
        var loggerMock = new Mock<ILogger<OrderService>>();

        var orderService = new OrderService(
            orderRepositoryMock.Object,
            paymentServiceMock.Object,
            cartRepositoryMock.Object,
            configurationMock.Object,
            cartServiceMock.Object,
            loggerMock.Object);

        // Act
        Func<Task> act = () => orderService.UpdateOrderStatusAsync(999, OrderStatus.Shipped);

        // Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(act);
    }
    [Fact]
    public async Task MarkOrderAsPaidAsync_ThrowsKeyNotFoundException_WhenOrderDoesNotExist()
    {
        // Arrange
        var orderRepositoryMock = new Mock<IOrderRepository>();
        orderRepositoryMock
            .Setup(r => r.GetOrderByStripeSessionIdAsync(It.IsAny<string>()))
            .ReturnsAsync((Order?)null);

        var paymentServiceMock = new Mock<IPaymentService>();
        var cartRepositoryMock = new Mock<ICartRepository>();
        var cartServiceMock = new Mock<ICartService>();
        var configurationMock = new Mock<IConfiguration>();
        var loggerMock = new Mock<ILogger<OrderService>>();

        var orderService = new OrderService(
            orderRepositoryMock.Object,
            paymentServiceMock.Object,
            cartRepositoryMock.Object,
            configurationMock.Object,
            cartServiceMock.Object,
            loggerMock.Object);

        // Act
        Func<Task> act = () => orderService.MarkOrderAsPaidAsync("fake_session_id");

        // Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(act);
    }
    [Fact]
    public async Task MarkOrderAsPaidAsync_DoesNothing_WhenOrderIsAlreadyPaid()
    {
        // Arrange
        var existingOrder = new Order
        {
            Id = 1,
            UserId = "user123",
            Status = OrderStatus.Paid,
            StripeSessionId = "fake_session_id",
            ShippingFullName = "John Doe",
            ShippingPhoneNumber = "1234567890",
            ShippingStreet = "123 Main St",
            ShippingCity = "Anytown",
            ShippingState = "CA",
            ShippingPostalCode = "12345",

        };

        var orderRepositoryMock = new Mock<IOrderRepository>();
        orderRepositoryMock
            .Setup(r => r.GetOrderByStripeSessionIdAsync("fake_session_id"))
            .ReturnsAsync(existingOrder);
        var paymentServiceMock = new Mock<IPaymentService>();
        var cartRepositoryMock = new Mock<ICartRepository>();
        var cartServiceMock = new Mock<ICartService>();
        var configurationMock = new Mock<IConfiguration>();
        var loggerMock = new Mock<ILogger<OrderService>>();

        var orderService = new OrderService(
            orderRepositoryMock.Object,
            paymentServiceMock.Object,
            cartRepositoryMock.Object,
            configurationMock.Object,
            cartServiceMock.Object,
            loggerMock.Object);

        // Act
        await orderService.MarkOrderAsPaidAsync("fake_session_id");

        // Assert
        orderRepositoryMock.Verify(r => r.Update(It.IsAny<Order>()), Times.Never);
        orderRepositoryMock.Verify(r => r.SaveChangesAsync(), Times.Never);
    }

    [Fact]
    public async Task UpdateOrderStatusAsync_UpdateStatusAndReturnsDto_WhenOrderExists()
    {
        // Arrange
        var existingOrder = new Order
        {
            Id = 1,
            UserId = "user123",
            Status = OrderStatus.Processing,
            StripeSessionId = "fake_session_id",
            ShippingFullName = "John Doe",
            ShippingPhoneNumber = "1234567890",
            ShippingStreet = "123 Main St",
            ShippingCity = "Anytown",
            ShippingState = "CA",
            ShippingPostalCode = "12345",

        };

        var orderRepositoryMock = new Mock<IOrderRepository>();
        orderRepositoryMock
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(existingOrder);

        var paymentServiceMock = new Mock<IPaymentService>();
        var cartRepositoryMock = new Mock<ICartRepository>();
        var cartServiceMock = new Mock<ICartService>();
        var configurationMock = new Mock<IConfiguration>();
        var loggerMock = new Mock<ILogger<OrderService>>();

        var orderService = new OrderService(
            orderRepositoryMock.Object,
            paymentServiceMock.Object,
            cartRepositoryMock.Object,
            configurationMock.Object,
            cartServiceMock.Object,
            loggerMock.Object);

        // Act
       var result=  await orderService.UpdateOrderStatusAsync(1, OrderStatus.Shipped);

        // Assert
        Assert.Equal(OrderStatus.Shipped.ToString(), result.Status);
        orderRepositoryMock.Verify(r => r.Update(existingOrder), Times.Once);
        orderRepositoryMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}
