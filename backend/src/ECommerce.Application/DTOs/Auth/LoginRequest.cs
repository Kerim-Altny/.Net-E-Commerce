using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Auth;

public sealed record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);