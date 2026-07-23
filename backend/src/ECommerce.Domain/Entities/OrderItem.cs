using System.ComponentModel.DataAnnotations.Schema;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }

    [ForeignKey("OrderId")]
    public required Order Order { get; set; }
    [ForeignKey("ProductId")]
    public required Product Product { get; set; }

    public required string ProductTitleSnapshot { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPriceAtPurchase { get; set; }
}