using InventorySystem.DTOs.Requests;
using InventorySystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _service;

        public SupplierController(ISupplierService service)
        { 
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpPost]
        [Authorize(Roles ="Manager ,Admin")]
        public IActionResult Create(CreateSupplierRequestDto dto)
        {
            _service.Create(dto);
            return Ok("Supplier Created");
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Manager ,Admin")]
        public IActionResult UpdateStatus(int id, UpdateSupplierStatusDto dto)
        {
            _service.UpdateStatus(id, dto);
            return Ok("Supplier status updated");
        }
    }
}
