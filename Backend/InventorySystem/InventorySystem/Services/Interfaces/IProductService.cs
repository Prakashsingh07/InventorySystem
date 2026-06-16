using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;

namespace InventorySystem.Services.Interfaces
{
    public interface IProductService
    {
        List<ProductResponseDto> GetAll();
        ProductResponseDto getById(int id);
        void Create(CreateProductRequestDto dto);
        void Update(int id,UpdateProductRequestDto dto);
        List<ProductResponseDto> Search(string search);
        List<ProductResponseDto> GetLowStock();
        void AdjustStock(int productId,StockAdjustmentRequestDto dto,int userId);

        List<StockMovementResponseDto> GetStockHistory(int productId);
    }
}

