using Application.Common.Constant;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public static class IdentitySeeder
{
    public static async Task SeedAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        if (!await roleManager.RoleExistsAsync(Role.Admin))
        {
            await roleManager.CreateAsync(
                new IdentityRole(Role.Admin));
        }

        if (!await roleManager.RoleExistsAsync(Role.User))
        {
            await roleManager.CreateAsync(
                new IdentityRole(Role.User));
        }

        var admin = await userManager.FindByEmailAsync("admin@gmail.com");

        if (admin is null)
        {
            admin = new User
            {
                FirstName = "ali",
                LastName = "ete",
                Email = "adminA1@gmail.com",
                UserName = "adminA1@gmail.com",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(
                admin,
                "Admin123!");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, Role.Admin);
            }
        }
    }
}
