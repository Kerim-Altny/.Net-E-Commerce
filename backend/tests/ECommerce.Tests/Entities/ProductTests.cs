namespace ECommerce.Tests.Entities;

public class ProductTests
{
    [Theory]
    [InlineData(1, 10)]
    [InlineData(50, 10)]
    [InlineData(51, 8)]
    [InlineData(100, 8)]
    [InlineData(101, 6)]
    public void GetUnitPrice_ReturnsCorrectTier(int quantity, decimal expectedPrice)
    {
        // Arrange
        var product = new Product
        {
            Title = "Test Product",
            Author = "Test Author",
            Isbn = "1234567890",
            Category= new Category { Name = "Test Category" },
           Price=10m,
           Price50=8m,
           Price100=6m
        };

        // Act
        var result= product.GetUnitPrice(quantity);

        // Assert
        Assert.Equal(expectedPrice, result);
    }
}