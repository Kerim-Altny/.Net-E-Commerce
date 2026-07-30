namespace ECommerce.Application.DTOs.Admin;

public sealed record DashboardDto(decimal TotalRevenue, int TotalOrders, int TotalUsers, int TotalProducts,List<MonthlyRevenue> MonthlyRevenue,Dictionary<string, int> OrderByStatus, Dictionary<string, int> ProductCountByCategory);