using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;

namespace InventorySystem.Services.Interfaces
{
    public interface IPurchaseOrderService
    {
        void Create(CreatePurchaseOrderRequestDto dto);

        List<PurchaseOrderResponseDto> GetAll();
        void Submit(int purchaseOrderId);

        void Approve(int purchaseOrderId);

        void Cancel(int purchaseOrderId);

        void Receive(int purchaseOrderId, int userId);
    }
}
