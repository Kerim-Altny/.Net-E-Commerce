using Microsoft.AspNetCore.Mvc.Testing;

namespace ECommerce.Tests.Controllers;
public class CategoriesControllerTests: IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public CategoriesControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task GetAllCategories_ReturnsOk()
    {
        // Act
        var response = await _client.GetAsync("/api/categories");

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
    }
}