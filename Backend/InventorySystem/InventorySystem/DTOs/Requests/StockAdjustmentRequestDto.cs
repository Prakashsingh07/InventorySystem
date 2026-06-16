namespace InventorySystem.DTOs.Requests
{
    public class StockAdjustmentRequestDto
    {
        public int QuantityDelta { get; set; }

        public string Reason { get; set; }
    }
}
