namespace ECommerce.Application.DTOs.Auth;

public sealed record RegisterRequest(string Email, string Password, string FullName, string StreetAddress, string City, string State, string PostalCode);
