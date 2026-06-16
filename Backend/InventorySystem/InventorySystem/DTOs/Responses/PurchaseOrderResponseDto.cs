namespace InventorySystem.DTOs.Responses
{
    public class PurchaseOrderResponseDto
    {
        public int PurchaseOrderId { get; set; }

        public string SupplierName { get; set; }

        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
