using InventorySystem.Data;
using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;
using InventorySystem.Models;
using InventorySystem.Services.Interfaces;

namespace InventorySystem.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly AppDbContext _context;

        public SupplierService(AppDbContext context)
        {
            _context = context;
        }

        public List<SupplierResponseDto> GetAll()
        {
            return _context.Suppliers.Select(s=>new SupplierResponseDto
            {
                SupplierId = s.SupplierId,
                Name = s.Name,
                IsActive = s.IsActive,
            }).ToList();
        }

        public void Create(CreateSupplierRequestDto dto)
        {
            var supplier = new Supplier
            {
                Name = dto.Name,
                IsActive = dto.IsActive
            };

            _context.Suppliers.Add(supplier);
            _context.SaveChanges();
        }

        public void UpdateStatus(int id,UpdateSupplierStatusDto dto)
        {
            var supplier = _context.Suppliers.FirstOrDefault(s=>s.SupplierId==id);

            if(supplier==null)
            {
                throw new Exception("Supplier Not found");
            }

            supplier.IsActive = dto.IsActive;

            _context.SaveChanges();
        }
    }
}
