using InventorySystem.Data;
using InventorySystem.Enums;
using InventorySystem.Models;
using InventorySystem.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace InventorySystem.Tests
{
    public class PurchaseOrderServiceTests
    {
        [Fact]
        public void Receive_Should_Update_Stock_And_Create_StockMovement()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase("ReceivePurchaseOrderDb")
                .Options;

            using var context = new AppDbContext(options);

            // Supplier
            context.Suppliers.Add(new Supplier
            {
                SupplierId = 1,
                Name = "ABC Traders",
                IsActive = true
            });

            // Product
            context.Products.Add(new Product
            {
                ProductId = 1,
                Name = "Laptop",
                SKU = "LAP001",
                CategoryId = 1,
                UnitPrice = 50000,
                Quantity = 10,
                ReorderThreshold = 5
            });

            // Purchase Order
            var purchaseOrder = new PurchaseOrder
            {
                Id = 1,
                SupplierId = 1,
                Status = PurchaseOrderStatus.Approved,
                CreatedAt = DateTime.UtcNow,
                LineItems = new List<PurchaseOrderLineItem>
                {
                    new PurchaseOrderLineItem
                    {
                        ProductId = 1,
                        Quantity = 5,
                        UnitPrice = 50000
                    }
                }
            };

            context.PurchaseOrders.Add(purchaseOrder);
            context.SaveChanges();

            var service = new PurchaseOrderService(context);

            // Act
            service.Receive(1, 100);

            // Assert
            Assert.Equal(PurchaseOrderStatus.Received,
                context.PurchaseOrders.First().Status);

            Assert.Equal(15,
                context.Products.First().Quantity);

            Assert.Single(context.StockMovements);
        }
    }
}