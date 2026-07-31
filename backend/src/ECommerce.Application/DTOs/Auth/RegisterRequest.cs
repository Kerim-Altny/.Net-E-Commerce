using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Auth;

public sealed record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password,
    [Required, MaxLength(200)] string FullName,
    [Required, MaxLength(300)] string StreetAddress,
    [Required, MaxLength(100)] string City,
    [Required, MaxLength(100)] string State,
    [Required, MaxLength(20)] string PostalCode);
