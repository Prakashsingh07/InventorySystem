using InventorySystem.Data;
using InventorySystem.DTOs.Requests;
using InventorySystem.DTOs.Responses;
using InventorySystem.Helpers;
using InventorySystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly JwtHelper _jwtHelper;


    public AuthService(AppDbContext context,JwtHelper jwtHelper)
    {
        _context = context;
        _jwtHelper = jwtHelper;
    }


    public LoginResponseDto Login(LoginRequestDto request)
    {
        var user = _context.Users.FirstOrDefault(x => x.Username == request.Username && x.Password == request.Password);


        if (user == null)
        {
            throw new Exception("Invalid username or password");
        }


        var token = _jwtHelper.GenerateToken(user);


        return new LoginResponseDto
        {
            Token = token,
            Role = user.Role
        };
    }
}