using InventorySystem.Enums;

namespace InventorySystem.Models
{
    public class PurchaseOrder
    {
        public int Id { get; set; }

        public int SupplierId { get; set; }

        public Supplier Supplier { get; set; }

        public PurchaseOrderStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<PurchaseOrderLineItem> LineItems { get; set; }
            = new List<PurchaseOrderLineItem>();
    }
}
