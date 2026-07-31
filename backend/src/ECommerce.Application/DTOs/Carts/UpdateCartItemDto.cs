using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Carts;

public sealed record UpdateCartItemDto([Range(1, int.MaxValue)] int Quantity);