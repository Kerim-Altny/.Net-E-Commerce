namespace ECommerce.Application.DTOs.Products;
public sealed record CreateProductDto(string Title, string Author, string Isbn, string? Description,  string? ImageUrl, decimal ListPrice, decimal Price, decimal Price50, decimal Price100, int CategoryId);
