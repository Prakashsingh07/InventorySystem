namespace InventorySystem.DTOs.Responses
{
    public class ProductResponseDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public string SKU {  get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int ReorderThreshold { get; set; }

    }
}
