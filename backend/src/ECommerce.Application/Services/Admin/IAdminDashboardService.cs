using ECommerce.Application.DTOs.Admin;

namespace ECommerce.Application.Services.Admin;

public interface IAdminDashboardService
{
    Task<DashboardDto> GetDashboardDataAsync();
    Task<IEnumerable<UserDto>> GetAllUsersAsync();
}