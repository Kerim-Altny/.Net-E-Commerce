using ECommerce.Application.Services.Admin;
using ECommerce.Application.Services.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers;
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminDashboardService _adminDashboardService;
    private readonly IOrderService _orderService;

    public AdminController(IAdminDashboardService adminDashboardService, IOrderService orderService)
    {
        _adminDashboardService = adminDashboardService;
        _orderService = orderService;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboardData()
    {
        var dashboardData = await _adminDashboardService.GetDashboardDataAsync();
        return Ok(dashboardData);
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _adminDashboardService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("orders")]
    public async Task<IActionResult> GetOrders([FromQuery] OrderStatus? status)
    {
        var orders = await _orderService.GetOrdersByStatusAsync(status);
        return Ok(orders);
    }

    [HttpPut("orders/{orderId}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusDto updateOrderStatusDto)
    {
        if (!Enum.TryParse<OrderStatus>(updateOrderStatusDto.NewStatus, true, out var newStatus))
        {
            return BadRequest("Invalid order status.");
        }

        try
        {
            var updatedOrder = await _orderService.UpdateOrderStatusAsync(orderId, newStatus);
            return Ok(updatedOrder);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}