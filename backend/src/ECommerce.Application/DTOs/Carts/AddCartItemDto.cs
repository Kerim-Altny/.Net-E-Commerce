using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Carts;

public sealed record AddCartItemDto(
    [Range(1, int.MaxValue)] int ProductId,
    [Range(1, int.MaxValue)] int Quantity);