using ECommerce.Application.DTOs.Products;
namespace ECommerce.Application.Services.Products;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize, int? categoryId);
    Task<ProductDto> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm);
    Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
    Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto updateProductDto);
    Task<bool> DeleteProductAsync(int id);
}
