namespace ECommerce.Application.DTOs.Orders;

public sealed record CreateOrderDto(string ShippingFullName, string ShippingPhoneNumber, string ShippingStreet, string ShippingCity, string ShippingState, string ShippingPostalCode);