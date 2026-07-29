using ECommerce.Application.DTOs.Categories;
namespace ECommerce.Application.DTOs.Products;

public sealed record ProductDto(int Id, string Title, string Author, string Isbn, string? Description, string? ImageUrl, decimal ListPrice, decimal Price, decimal Price50, decimal Price100, CategoryDto Category);