﻿using Entities;
using Infrastructure.Constants;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MessageApi
{
    public static class DataBaseSeeder
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppEFContext>();
                context.Database.Migrate();

                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                if(!roleManager.Roles.Any())
                {
                    var result = roleManager.CreateAsync(new IdentityRole
                    {
                        Name = Roles.Admin
                    }).Result;
                    result = roleManager.CreateAsync(new IdentityRole
                    {
                        Name = Roles.User
                    }).Result;
                }
                if(!userManager.Users.Any())
                {
                    string email = "admin@gmail.com";
                    var user = new ApplicationUser
                    {
                        Email = email,
                        UserName = email,
                        Image = "1.jpg",
                        FirstName = "Максим",
                        LastName = "Шпаргалка"
                    };
                    var result = userManager.CreateAsync(user).Result;
                    result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                }
            }
        }
    }
}
