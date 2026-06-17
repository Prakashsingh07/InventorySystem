using InventorySystem.Data;
using InventorySystem.Models;
using InventorySystem.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace InventorySystem.Tests
{
    public class ProductServiceTests
    {
        [Fact]
        public void GetLowStock_Should_Return_Only_Low_Stock_Products()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "LowStockTestDb")
                .Options;

            using var context = new AppDbContext(options);

            context.Categories.Add(new Category
            {
                Id = 1,
                Name = "Electronics"
            });

            context.Products.AddRange(
                new Product
                {
                    ProductId = 1,
                    Name = "Laptop",
                    CategoryId = 1,
                    SKU = "LAP001",
                    UnitPrice = 50000,
                    Quantity = 2,
                    ReorderThreshold = 5
                },
                new Product
                {
                    ProductId = 2,
                    Name = "Mouse",
                    CategoryId = 1,
                    SKU = "MOU001",
                    UnitPrice = 500,
                    Quantity = 20,
                    ReorderThreshold = 5
                });

            context.SaveChanges();

            var service = new ProductService(context);

            // Act
            var result = service.GetLowStock();

            // Assert
            Assert.Single(result);
            Assert.Equal("Laptop", result.First().Name);
        }

        [Fact]
        public void AdjustStock_Should_Create_StockMovement()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "AdjustStockTestDb")
                .Options;

            using var context = new AppDbContext(options);

            context.Categories.Add(new Category
            {
                Id = 1,
                Name = "Electronics"
            });

            context.Products.Add(new Product
            {
                ProductId = 1,
                Name = "Laptop",
                CategoryId = 1,
                SKU = "LAP001",
                UnitPrice = 50000,
                Quantity = 10,
                ReorderThreshold = 5
            });

            context.SaveChanges();

            var service = new ProductService(context);

            // Act
            service.AdjustStock(
                1,
                new DTOs.Requests.StockAdjustmentRequestDto
                {
                    QuantityDelta = 5,
                    Reason = "Manual Adjustment"
                },
                1);

            // Assert
            Assert.Equal(15, context.Products.First().Quantity);
            Assert.Single(context.StockMovements);
        }
    }
}