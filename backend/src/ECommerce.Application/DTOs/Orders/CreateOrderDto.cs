using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Orders;

public sealed record CreateOrderDto(
    [Required, MaxLength(200)] string ShippingFullName,
    [Required, Phone] string ShippingPhoneNumber,
    [Required, MaxLength(300)] string ShippingStreet,
    [Required, MaxLength(100)] string ShippingCity,
    [Required, MaxLength(100)] string ShippingState,
    [Required, MaxLength(20)] string ShippingPostalCode);