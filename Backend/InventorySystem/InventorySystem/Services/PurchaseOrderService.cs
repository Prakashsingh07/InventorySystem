using InventorySystem.Data;
using InventorySystem.Services.Interfaces;
using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;
using InventorySystem.Enums;
using InventorySystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly AppDbContext _context;

        public PurchaseOrderService(AppDbContext context)
        {
            _context = context;
        }

        public void Create(CreatePurchaseOrderRequestDto dto)
        {
            var supplier = _context.Suppliers
                .FirstOrDefault(s => s.SupplierId == dto.SupplierId);

            if (supplier == null)
            {
                throw new Exception("Supplier not found");
            }

            if (!supplier.IsActive)
            {
                throw new Exception("Cannot create purchase order for an inactive supplier");
            }

            var purchaseOrder = new PurchaseOrder
            {
                SupplierId = dto.SupplierId,
                Status = PurchaseOrderStatus.Draft,
                CreatedAt = DateTime.UtcNow
            };

            _context.PurchaseOrders.Add(purchaseOrder);
            _context.SaveChanges();

            foreach (var item in dto.LineItems)
            {
                var lineItem = new PurchaseOrderLineItem
                {
                    PurchaseOrderId = purchaseOrder.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice
                };

                _context.PurchaseOrderLineItems.Add(lineItem);
            }

            _context.SaveChanges();
        }

        public List<PurchaseOrderResponseDto> GetAll()
        {
            return _context.PurchaseOrders.Include(p => p.Supplier).Select(p => new PurchaseOrderResponseDto
                {
                    PurchaseOrderId = p.Id,
                    SupplierName = p.Supplier.Name,
                    Status = p.Status.ToString(),
                    CreatedAt = p.CreatedAt
                }).ToList();
        }

        public void Submit(int purchaseOrderId)
        {
            var purchaseOrder = _context.PurchaseOrders
                .FirstOrDefault(p => p.Id == purchaseOrderId);

            if (purchaseOrder == null)
            {
                throw new Exception("Purchase Order not found");
            }

            if (purchaseOrder.Status != PurchaseOrderStatus.Draft)
            {
                throw new Exception("Only Draft purchase orders can be submitted");
            }

            purchaseOrder.Status = PurchaseOrderStatus.Submitted;

            _context.SaveChanges();
        }

        public void Approve(int purchaseOrderId)
        {
            var purchaseOrder = _context.PurchaseOrders
                .FirstOrDefault(p => p.Id == purchaseOrderId);

            if (purchaseOrder == null)
            {
                throw new Exception("Purchase Order not found");
            }

            if (purchaseOrder.Status != PurchaseOrderStatus.Submitted)
            {
                throw new Exception("Only Submitted purchase orders can be approved");
            }

            purchaseOrder.Status = PurchaseOrderStatus.Approved;

            _context.SaveChanges();
        }

        public void Cancel(int purchaseOrderId)
        {
            var purchaseOrder = _context.PurchaseOrders
                .FirstOrDefault(p => p.Id == purchaseOrderId);

            if (purchaseOrder == null)
            {
                throw new Exception("Purchase Order not found");
            }

            if (purchaseOrder.Status == PurchaseOrderStatus.Received)
            {
                throw new Exception("Received purchase orders cannot be cancelled");
            }

            purchaseOrder.Status = PurchaseOrderStatus.Cancelled;

            _context.SaveChanges();
        }

        public void Receive(int purchaseOrderId, int userId)
        {
            var purchaseOrder = _context.PurchaseOrders
                .Include(p => p.LineItems)
                .FirstOrDefault(p => p.Id == purchaseOrderId);

            if (purchaseOrder == null)
            {
                throw new Exception("Purchase Order not found");
            }

            if (purchaseOrder.Status != PurchaseOrderStatus.Approved)
            {
                throw new Exception("Only Approved purchase orders can be received");
            }

            foreach (var item in purchaseOrder.LineItems)
            {
                var product = _context.Products
                    .FirstOrDefault(p => p.ProductId == item.ProductId);

                if (product == null)
                {
                    continue;
                }

                product.Quantity += item.Quantity;

                var movement = new StockMovement
                {
                    ProductId = item.ProductId,
                    QuantityChanged = item.Quantity,
                    Reason = "Purchase Order Received",
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.StockMovements.Add(movement);
            }

            purchaseOrder.Status = PurchaseOrderStatus.Received;

            _context.SaveChanges();
        }



    }
}
