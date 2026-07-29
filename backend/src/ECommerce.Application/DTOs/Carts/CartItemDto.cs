namespace ECommerce.Application.DTOs.Carts;

public class CartItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }

    public string ProductTitle { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal LineTotal => UnitPrice * Quantity;
}