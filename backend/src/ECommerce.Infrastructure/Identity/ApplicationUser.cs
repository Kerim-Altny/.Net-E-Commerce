
using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public required string FullName { get; set; }
    public required string StreetAddress { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string PostalCode { get; set; }
}