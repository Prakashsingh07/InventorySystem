namespace InventorySystem.DTOs.Requests
{
    public class UpdateProductRequestDto
    {
        public string Name  { get; set; }
        public int CategoryId { get; set; }
        public decimal UnitPrice { get; set; }
        public int ReorderThreshold { get; set; }
    }
}
