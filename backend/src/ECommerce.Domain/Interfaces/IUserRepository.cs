public interface IUserRepository
{
    Task<int> GetUserCountAsync();
    Task<IEnumerable<UserSummary>> GetAllUsersAsync();
}

public record UserSummary(string Id, string Email, string FullName);