public class Order
{

    public int Id { get; set; }
    public required string UserId { get; set; }
    public DateTime OrderDate { get; set; }
    public OrderStatus Status { get; set; }

    public decimal TotalAmount { get; set; }

    public string? StripeSessionId { get; set; }

    public required string ShippingFullName { get; set; }
    public required string ShippingPhoneNumber { get; set; }
    public required string ShippingStreet { get; set; }
    public required string ShippingCity { get; set; }
    public required string ShippingState { get; set; }
    public required string ShippingPostalCode { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}