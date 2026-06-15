namespace InventorySystem.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string SKU { get; set; }

        public decimal UnitPrice { get; set; }

        public int Quantity     { get; set; }

        public int ReorderThreshold { get; set; }

        public int CategoryId   { get; set; }
        public Category Category { get; set; }
    }
}
