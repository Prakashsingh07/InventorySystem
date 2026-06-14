using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;

namespace InventorySystem.Services.Interfaces
{
    public interface IAuthService
    {
        LoginResponseDto Login(LoginRequestDto request);
    }
}

