using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Orders;

public sealed record UpdateOrderStatusDto([Required] string NewStatus);