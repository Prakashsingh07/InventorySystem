using InventorySystem.Data;
using InventorySystem.Models;

namespace InventorySystem.Seed
{
    public class DataSeed
    {
        public static void SeedUser(AppDbContext _context)
        {
            if (_context.Users.Any()) return;

            var users = new List<User>
            {
                new User
                {
                    Username = "Shubham",
                    Password = "shubham123",
                    Role = "Staff",
                    TenantId = 1
                },
                new User
                {
                    Username = "Vishal",
                    Password = "vishal123",
                    Role = "Manager",
                    TenantId = 1
                },
                  new User
                {
                    Username = "Prakash",
                    Password = "prakash123",
                    Role = "Admin",
                    TenantId = 1
                }
            };
            _context.Users.AddRange(users);
            _context.SaveChanges();
        }
    }
}
