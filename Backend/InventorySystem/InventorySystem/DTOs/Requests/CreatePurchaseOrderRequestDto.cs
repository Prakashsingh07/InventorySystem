
namespace InventorySystem.DTOs.Requests
{
    public class CreatePurchaseOrderRequestDto
    {
        public int SupplierId { get; set; }

        public List<CreatePurchaseOrderLineItemDto> LineItems { get; set; }
            = new List<CreatePurchaseOrderLineItemDto>();
    }
}
