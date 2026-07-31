using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Products;

public sealed record UpdateProductDto(
    [Required, MaxLength(300)] string Title,
    [Required, MaxLength(200)] string Author,
    [Required, MaxLength(20)] string Isbn,
    string? Description,
    [Url] string? ImageUrl,
    [Range(typeof(decimal), "0.01", "999999")] decimal ListPrice,
    [Range(typeof(decimal), "0.01", "999999")] decimal Price,
    [Range(typeof(decimal), "0.01", "999999")] decimal Price50,
    [Range(typeof(decimal), "0.01", "999999")] decimal Price100,
    [Range(1, int.MaxValue)] int CategoryId);