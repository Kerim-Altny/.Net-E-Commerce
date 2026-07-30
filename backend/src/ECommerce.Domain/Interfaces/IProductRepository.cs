public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId);
    Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm);
    Task<IEnumerable<Product>> GetPagedAsync(int pageNumber, int pageSize, int? categoryId);
    Task<int> GetProductCountAsync();
    Task<Dictionary<string, int>> GetProductCountByCategoryAsync();
}