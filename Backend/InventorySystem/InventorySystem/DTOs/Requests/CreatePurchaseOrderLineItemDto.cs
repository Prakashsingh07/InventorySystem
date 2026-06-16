namespace InventorySystem.DTOs.Requests
{
    public class CreatePurchaseOrderLineItemDto
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }
    }
}
