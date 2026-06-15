using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;

namespace InventorySystem.Services.Interfaces
{
    public interface ISupplierService
    {
        List<SupplierResponseDto> GetAll();
        void Create(CreateSupplierRequestDto dto);
        void UpdateStatus(int id, UpdateSupplierStatusDto dto);
    }
}
