using InventorySystem.Data;
using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;
using InventorySystem.Models;
using InventorySystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public List<ProductResponseDto> GetAll()
        {
            return _context.Products.Include(p => p.Category).Select(p => new ProductResponseDto
            {
                ProductId = p.ProductId,
                Name = p.Name,
                CategoryName = p.Category.Name,
                SKU = p.SKU,
                UnitPrice = p.UnitPrice,
                Quantity = p.Quantity,
                ReorderThreshold = p.ReorderThreshold
            }).ToList();
        }

        public void Create(CreateProductRequestDto dto)
        {
            bool skuExists = _context.Products.Any(p => p.SKU == dto.SKU);

            if (skuExists)
            {
                throw new Exception("SKU already exists");
            }

            bool categoryExists = _context.Categories.Any(c => c.Id == dto.CategoryId);

            if (!categoryExists)
            {
                throw new Exception("Invalid Category");
            }

            var product = new Product
            {
                Name = dto.Name,
                CategoryId = dto.CategoryId,
                SKU = dto.SKU,
                UnitPrice = dto.UnitPrice,
                Quantity = dto.Quantity,
                ReorderThreshold = dto.ReorderThreshold
            };

            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public List<ProductResponseDto> Search(string term)
        {
            return _context.Products.Include(p => p.Category)
                .Where(p => p.Name.Contains(term) || p.SKU.Contains(term))
                .Select(p => new ProductResponseDto
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    CategoryName = p.Category.Name,
                    SKU = p.SKU,
                    UnitPrice = p.UnitPrice,
                    Quantity = p.Quantity,
                    ReorderThreshold = p.ReorderThreshold
                }).ToList();
        }

        public List<ProductResponseDto> GetLowStock()
        {
            return _context.Products.Include(p => p.Category)
                .Where(p => p.Quantity <= p.ReorderThreshold)
                .Select(p => new ProductResponseDto
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    CategoryName = p.Category.Name,
                    SKU = p.SKU,
                    UnitPrice = p.UnitPrice,
                    Quantity = p.Quantity,
                    ReorderThreshold = p.ReorderThreshold
                }).ToList();
        }

        public ProductResponseDto getById(int id)
        {
            var product = _context.Products.Include(p => p.Category)
                .FirstOrDefault(p => p.ProductId == id);

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            return new ProductResponseDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                CategoryName = product.Category.Name,
                SKU = product.SKU,
                UnitPrice = product.UnitPrice,
                Quantity = product.Quantity,
                ReorderThreshold = product.ReorderThreshold
            };
        }

        public void Update(int id, UpdateProductRequestDto dto)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == id);

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            bool categoryExists = _context.Categories.Any(c => c.Id == dto.CategoryId);

            if (!categoryExists)
            {
                throw new Exception("Category not found");
            }

            product.Name = dto.Name;
            product.CategoryId = dto.CategoryId;
            product.UnitPrice = dto.UnitPrice;
            product.ReorderThreshold = dto.ReorderThreshold;
            _context.SaveChanges();
        }

        public void AdjustStock(int id, StockAdjustmentRequestDto dto, int userId)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == id);

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            int newQuantity = product.Quantity + dto.QuantityDelta;

            if (newQuantity < 0)
            {
                throw new Exception("Stock cannot become negative");
            }

            product.Quantity = newQuantity;

            var movement = new StockMovement
            {
                ProductId = id,       
                QuantityChanged = dto.QuantityDelta,
                Reason = dto.Reason,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.StockMovements.Add(movement);
            _context.SaveChanges();
        }

        public List<StockMovementResponseDto> GetStockHistory(int productId)
        {
            return _context.StockMovements.Include(s => s.Product)
                .Where(s => s.ProductId == productId)
                .OrderByDescending(s => s.CreatedAt)
                .Select(s => new StockMovementResponseDto
                {
                    Id = s.Id,
                    ProductName = s.Product.Name,
                    QuantityChanged = s.QuantityChanged,
                    Reason = s.Reason,
                    UserId = s.UserId,
                    CreatedAt = s.CreatedAt
                }).ToList();
        }
    }
}