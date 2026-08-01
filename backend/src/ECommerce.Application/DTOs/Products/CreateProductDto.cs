using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Products;

public sealed record CreateProductDto(
    [Required, MaxLength(300)] string Title,
    [Required, MaxLength(200)] string Author,
    [Required, MaxLength(20)] string Isbn,
    string? Description,
    [Url] string? ImageUrl,
    [Range(0.01, 999999)] decimal ListPrice,
    [Range(0.01, 999999)] decimal Price,
    [Range(0.01, 999999)] decimal Price50,
    [Range(0.01, 999999)] decimal Price100,
    [Range(1, int.MaxValue)] int CategoryId);
