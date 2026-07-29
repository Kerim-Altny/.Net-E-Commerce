namespace ECommerce.Application.DTOs.Carts;

public class CartDto
{
    public int Id { get; set; }
    public IEnumerable<CartItemDto> Items { get; set; } = new List<CartItemDto>();
    public decimal Total => Items.Sum(i => i.LineTotal);
}