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
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _service;
        public PurchaseOrderController(IPurchaseOrderService service) 
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpPost]
        [Authorize(Roles ="Staff,Manager,Admin")]
        public IActionResult Create(CreatePurchaseOrderRequestDto dto)
        {
            _service.Create(dto);
            return Ok("Purchase Order Created Successfully");
        }

        [HttpPut("{id}/submit")]
        public IActionResult Submit(int id)
        {
            _service.Submit(id);

            return Ok("Purchase Order submitted");
        }

        [HttpPut("{id}/approve")]
        [Authorize(Roles = "Manager,Admin")]
        public IActionResult Approve(int id)
        {
            _service.Approve(id);

            return Ok("Purchase Order approved");
        }

        [HttpPut("{id}/cancel")]
        public IActionResult Cancel(int id)
        {
            _service.Cancel(id);

            return Ok("Purchase Order cancelled");
        }

        [HttpPut("{id}/receive")]
        [Authorize(Roles = "Manager,Admin")]
        public IActionResult Receive(int id)
        {
            var userId = int.Parse(
                User.FindFirst("UserId")!.Value
            );

            _service.Receive(id, userId);

            return Ok("Purchase Order received");
        }


    }
}
