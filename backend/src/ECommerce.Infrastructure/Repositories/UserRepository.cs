using Microsoft.EntityFrameworkCore;
namespace ECommerce.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public UserRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<int> GetUserCountAsync()
    {
        return await _dbContext.Users.CountAsync();
    }

    public async Task<IEnumerable<UserSummary>> GetAllUsersAsync()
    {
        return await _dbContext.Users
            .Select(u => new UserSummary(u.Id, u.Email ?? string.Empty, u.FullName))
            .ToListAsync();
    }
}