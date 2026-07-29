using Microsoft.EntityFrameworkCore;
namespace ECommerce.Infrastructure.Repositories;

public class CartRepository : ICartRepository
{
    private readonly AppDbContext _context;

    public CartRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Cart entity)
    {
        await _context.Carts.AddAsync(entity);
    }

    public void Delete(Cart entity)
    {
        _context.Carts.Remove(entity);
    }

    public async Task<Cart?> GetCartByUserIdAsync(string userId)
    {
        return await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
    }
    public async Task<Cart?> GetCartWithItemsAsync(int cartId)
    {
        return await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.Id == cartId);
    }

    public async Task<IEnumerable<Cart>> GetAllAsync()
    {
        return await _context.Carts.ToListAsync();
    }
    public async Task<Cart?> GetByIdAsync(int id)
    {
        return await _context.Carts.FirstOrDefaultAsync(c => c.Id == id);
    }

    public void Update(Cart entity)
    {
        _context.Carts.Update(entity);
    }

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}