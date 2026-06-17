using InventorySystem.Data;
using InventorySystem.DTOs.Requests;
using InventorySystem.Models;
using InventorySystem.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace InventorySystem.Tests
{
    public class SupplierServiceTests
    {
        [Fact]
        public void UpdateStatus_Should_Update_Supplier_Status()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase("SupplierTestDb")
                .Options;

            using var context = new AppDbContext(options);

            context.Suppliers.Add(new Supplier
            {
                SupplierId = 1,
                Name = "ABC Traders",
                IsActive = true
            });

            context.SaveChanges();

            var service = new SupplierService(context);

   
            service.UpdateStatus(
                1,
                new UpdateSupplierStatusDto
                {
                    IsActive = false
                });

      
            Assert.False(context.Suppliers.First().IsActive);
        }
    }
}
