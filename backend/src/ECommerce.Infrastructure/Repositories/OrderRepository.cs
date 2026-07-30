using Microsoft.EntityFrameworkCore;
namespace ECommerce.Infrastructure.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .ToListAsync();
    }

    public async Task<Order?> GetOrderWithItemsAsync(int orderId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }

    public async Task<Order?> GetOrderByStripeSessionIdAsync(string stripeSessionId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.StripeSessionId == stripeSessionId);
    }

    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .ToListAsync();
    }

    public async Task AddAsync(Order entity)
    {
        await _context.Orders.AddAsync(entity);
    }

    public void Update(Order entity)
    {
        _context.Orders.Update(entity);
    }

    public void Delete(Order entity)
    {
        _context.Orders.Remove(entity);
    }

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }

    public async Task<decimal> GetTotalRevenueAsync()
    {
        return await _context.Orders
            .Where(o => o.Status == OrderStatus.Paid)
            .SumAsync(o => o.TotalAmount);
    }

    public async Task<int> GetOrderCountAsync()
    {
        return await _context.Orders.CountAsync();
    }

    public async Task<Dictionary<OrderStatus, int>> GetOrderCountByStatusAsync()
    {
        var counts = await _context.Orders
            .GroupBy(o => o.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.Status, x => x.Count);
        return counts;
    }

    public async Task<IEnumerable<MonthlyRevenue>> GetMonthlyRevenueAsync(int months)
    {
        var startDate = DateTime.UtcNow.AddMonths(-months);
        var revenues = await _context.Orders
            .Where(o => o.Status == OrderStatus.Paid && o.OrderDate >= startDate)
            .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
            .Select(g => new MonthlyRevenue(g.Key.Year, g.Key.Month, g.Sum(x => x.TotalAmount)))
            .ToListAsync();
        return revenues;
    }

    public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus? status)
    {
        var query = _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).AsQueryable();
        if (status.HasValue)
        {
            query = query.Where(o => o.Status == status.Value);
        }
        return await query.ToListAsync();
    }
}