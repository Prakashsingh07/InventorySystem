namespace InventorySystem.DTOs.Requests
{
    public class CreateProductRequestDto
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string SKU { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int ReorderThreshold { get; set; }
    }
}
