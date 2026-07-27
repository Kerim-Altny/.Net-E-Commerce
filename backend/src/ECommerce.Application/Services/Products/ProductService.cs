using ECommerce.Application.DTOs.Categories;
using ECommerce.Application.DTOs.Products;

namespace ECommerce.Application.Services.Products;
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize, int? categoryId)
    {
        var products = await _productRepository.GetPagedAsync(pageNumber, pageSize, categoryId);
        return products.Select(p => new ProductDto(p.Id, p.Title, p.Author, p.Isbn, p.Description, p.ImageUrl, p.ListPrice, p.Price, p.Price50, p.Price100, new CategoryDto(p.Category.Id, p.Category.Name, p.Category.DisplayOrder)));
    }
    

    public async Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm)
    {
        var products = await _productRepository.SearchProductsAsync(searchTerm);
        return products.Select(p => new ProductDto(p.Id, p.Title, p.Author, p.Isbn, p.Description, p.ImageUrl, p.ListPrice, p.Price, p.Price50, p.Price100, new CategoryDto(p.Category.Id, p.Category.Name, p.Category.DisplayOrder)));
    }

    public async Task<ProductDto> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }
        return new ProductDto(product.Id, product.Title, product.Author, product.Isbn, product.Description, product.ImageUrl, product.ListPrice, product.Price, product.Price50, product.Price100, new CategoryDto(product.Category.Id, product.Category.Name,product.Category.DisplayOrder));
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto)
    {
        var category = await _categoryRepository.GetByIdAsync(createProductDto.CategoryId);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {createProductDto.CategoryId} not found.");
        }
        var product = new Product
        {
            Title = createProductDto.Title,
            Author = createProductDto.Author,
            Isbn = createProductDto.Isbn,
            Description = createProductDto.Description,
            ImageUrl = createProductDto.ImageUrl,
            ListPrice = createProductDto.ListPrice,
            Price = createProductDto.Price,
            Price50 = createProductDto.Price50,
            Price100 = createProductDto.Price100,
            CategoryId = createProductDto.CategoryId,
            Category = category

        };
        await _productRepository.AddAsync(product);
        await _productRepository.SaveChangesAsync();
        return new ProductDto(product.Id, product.Title, product.Author, product.Isbn, product.Description, product.ImageUrl, product.ListPrice, product.Price, product.Price50, product.Price100, new CategoryDto(product.Category.Id, product.Category.Name, product.Category.DisplayOrder));

    }

    public async Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto updateProductDto)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }
        var category = await _categoryRepository.GetByIdAsync(updateProductDto.CategoryId);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {updateProductDto.CategoryId} not found.");
        }
        product.Title = updateProductDto.Title;
        product.Author = updateProductDto.Author;
        product.Isbn = updateProductDto.Isbn;
        product.Description = updateProductDto.Description;
        product.ImageUrl = updateProductDto.ImageUrl;
        product.ListPrice = updateProductDto.ListPrice;
        product.Price = updateProductDto.Price;
        product.Price50 = updateProductDto.Price50;
        product.Price100 = updateProductDto.Price100;
        product.CategoryId = updateProductDto.CategoryId;
        product.Category = category;
        _productRepository.Update(product);
        await _productRepository.SaveChangesAsync();
        return new ProductDto(product.Id, product.Title, product.Author, product.Isbn, product.Description, product.ImageUrl, product.ListPrice, product.Price, product.Price50, product.Price100, new CategoryDto(product.Category.Id, product.Category.Name, product.Category.DisplayOrder));
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }
        _productRepository.Delete(product);
        await _productRepository.SaveChangesAsync();
        return true;
    }
}

