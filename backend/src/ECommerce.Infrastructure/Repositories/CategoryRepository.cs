using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task AddAsync(Category entity)
    {
        await _context.Categories.AddAsync(entity);
    }

    public void Delete(Category entity)
    {
        _context.Categories.Remove(entity);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesWithProductsAsync()
    {
        return await _context.Categories.Include(c => c.Products).ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public void Update(Category entity)
    {
        _context.Categories.Update(entity);
    }

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}