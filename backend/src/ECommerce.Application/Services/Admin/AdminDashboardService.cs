using ECommerce.Application.DTOs.Admin;

namespace ECommerce.Application.Services.Admin;

public class AdminDashboardService : IAdminDashboardService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;

    public AdminDashboardService(IOrderRepository orderRepository, IUserRepository userRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _userRepository = userRepository;
        _productRepository = productRepository;
    }

    public async Task<DashboardDto> GetDashboardDataAsync()
    {
        var totalRevenue = await _orderRepository.GetTotalRevenueAsync();
        var totalOrders = await _orderRepository.GetOrderCountAsync();
        var totalUsers = await _userRepository.GetUserCountAsync();
        var totalProducts = await _productRepository.GetProductCountAsync();
        var rawMonthlyRevenue = await _orderRepository.GetMonthlyRevenueAsync(12);
        var lookup = rawMonthlyRevenue.ToDictionary(r => (r.Year, r.Month), r => r.Revenue);
        var monthlyRevenue = new List<MonthlyRevenue>();
        for (int i = 11; i >= 0; i--)
        {
            var date = DateTime.UtcNow.AddMonths(-i);
            var revenue = lookup.GetValueOrDefault((date.Year, date.Month), 0m);
            monthlyRevenue.Add(new MonthlyRevenue(date.Year, date.Month, revenue));
        }
        var rawOrderByStatus = await _orderRepository.GetOrderCountByStatusAsync();
        var orderByStatus = new Dictionary<string, int>();
        foreach (var kvp in Enum.GetValues<OrderStatus>())
        {
            orderByStatus[kvp.ToString()] = rawOrderByStatus.GetValueOrDefault(kvp, 0);
        }
        var productCountByCategory = await _productRepository.GetProductCountByCategoryAsync();

        return new DashboardDto(totalRevenue, totalOrders, totalUsers, totalProducts, monthlyRevenue, orderByStatus, productCountByCategory);
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllUsersAsync();
        return users.Select(u => new UserDto(u.Id, u.Email, u.FullName));
    }
}