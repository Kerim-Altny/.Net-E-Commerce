using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using ECommerce.Application.DTOs.Auth;
using Microsoft.AspNetCore.Mvc.Testing;

namespace ECommerce.Tests.Controllers;

public class AuthControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public AuthControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Register_ReturnsOk_WhenValidDataProvided()
    {
        // Arrange
        var email = $"test-{Guid.NewGuid()}@example.com";
        var registerRequest = new RegisterRequest(
            email,
            "StrongPassword123!",
            "Test User",
            "123 Main St",
            "Istanbul",
            "Istanbul",
            "34000");

        // Act
        var response = await _client.PostAsJsonAsync("/api/auth/register", registerRequest);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    private async Task<string> RegisterAndLoginAsCustomerAsync()
    {
        var email = $"test-{Guid.NewGuid()}@example.com";
        const string password = "StrongPassword123!";
        var registerRequest = new RegisterRequest(
            email, password, "Test User", "123 Main St", "Istanbul", "Istanbul", "34000");
        await _client.PostAsJsonAsync("/api/auth/register", registerRequest);

        var loginRequest = new LoginRequest(email, password);
        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);
        var loginBody = await loginResponse.Content.ReadFromJsonAsync<JsonDocument>();
        return loginBody!.RootElement.GetProperty("token").GetString()!;
    }

    [Fact]
    public async Task Login_ReturnsTokenThatWorksForAuthorizedEndpoint()
    {
        // Arrange
        var token = await RegisterAndLoginAsCustomerAsync();
        var request = new HttpRequestMessage(HttpMethod.Get, "/api/cart");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.SendAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task AdminDashboard_ReturnsForbidden_WhenCustomerTokenUsed()
    {
        // Arrange
        var token = await RegisterAndLoginAsCustomerAsync();
        var request = new HttpRequestMessage(HttpMethod.Get, "/api/admin/dashboard");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.SendAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Fact]
    public async Task AdminDashboard_ReturnsUnauthorized_WhenNoTokenProvided()
    {
        // Act
        var response = await _client.GetAsync("/api/admin/dashboard");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}
