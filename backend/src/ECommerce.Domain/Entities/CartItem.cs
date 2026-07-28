using System.ComponentModel.DataAnnotations.Schema;

public class CartItem
{
    public int Id { get; set; }
    public required int ProductId { get; set; }
    public required int Quantity { get; set; }
    public int CartId { get; set; }

    [ForeignKey("CartId")]
    public required Cart Cart { get; set; }

    [ForeignKey("ProductId")]
    public required Product Product { get; set; }
}