using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    public int Id { get; set; }

    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Isbn { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }

    public decimal ListPrice { get; set; }

    public decimal Price { get; set; }
    public decimal Price50 { get; set; }
    public decimal Price100 { get; set; }
    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public required Category Category { get; set; }
}