namespace InventorySystem.Models
{
    public class StockMovement
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        // +10, -5 etc
        public int QuantityChanged { get; set; }
        public string Reason { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

