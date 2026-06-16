using InventorySystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

            modelBuilder.Entity<Product>().HasIndex(p=>p.SKU).IsUnique();
        }
    }
}
