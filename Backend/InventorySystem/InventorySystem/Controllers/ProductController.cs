using InventorySystem.DTOs.Requests;
using InventorySystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace InventorySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_service.getById(id));
        }

        [HttpPost]
        [Authorize(Roles ="Manager,Admin")]
        public IActionResult Create(CreateProductRequestDto dto)
        {
            _service.Create(dto);
            return Ok("product created");
        }

        [HttpPut("{id}")]
        [Authorize(Roles ="Manager,Admin")]
        public IActionResult Update(int id,UpdateProductRequestDto dto)
        {
            _service.Update(id, dto);
            return Ok("Product Updated");
        }

        [HttpGet("search")]
        public IActionResult Search(string term)
        {
            return Ok(_service.Search(term));
        }

        [HttpGet("low-stock")]
        public IActionResult LowStock()
        {
            return Ok(_service.GetLowStock());
        }

        [HttpPut("{id}/stock")]
        [Authorize(Roles = "Staff,Manager,Admin")]
        public IActionResult AdjustStock(int id,StockAdjustmentRequestDto dto)
        {
            var userId =int.Parse(User.FindFirst("UserId")!.Value);

            _service.AdjustStock(
                id,
                dto,
                userId);

            return Ok("Stock adjusted successfully");
        }

        [HttpGet("{id}/stock-history")]
        public IActionResult GetStockHistory(int id)
        {
            return Ok(_service.GetStockHistory(id));
        }
    }
}
