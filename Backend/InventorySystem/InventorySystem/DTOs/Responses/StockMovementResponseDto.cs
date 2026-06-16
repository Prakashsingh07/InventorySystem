namespace InventorySystem.DTOs.Responses
{
    public class StockMovementResponseDto
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public int QuantityChanged { get; set; }

        public string Reason { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
