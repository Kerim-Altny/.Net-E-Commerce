using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class IdentitySeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var configuration = services.GetRequiredService<IConfiguration>();

        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        if (!await roleManager.RoleExistsAsync("Customer"))
        {
            await roleManager.CreateAsync(new IdentityRole("Customer"));
        }

        var adminEmail = configuration["SeedAdmin:Email"];
        var adminPassword = configuration["SeedAdmin:Password"];

        if (string.IsNullOrWhiteSpace(adminEmail) || string.IsNullOrWhiteSpace(adminPassword))
        {
            return;
        }

        var existingAdmin = await userManager.FindByEmailAsync(adminEmail);
        if (existingAdmin is not null)
        {
            return;
        }

        var adminUser = new ApplicationUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            EmailConfirmed = true,
            FullName = "Site Admin",
            StreetAddress = "N/A",
            City = "N/A",
            State = "N/A",
            PostalCode = "00000"
        };

        var result = await userManager.CreateAsync(adminUser, adminPassword);
        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"Admin kullanıcısı oluşturulamadı: {errors}");
        }

        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}
