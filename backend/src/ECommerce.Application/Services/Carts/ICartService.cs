using ECommerce.Application.DTOs.Carts;

namespace ECommerce.Application.Services.Carts;

public interface ICartService
{
    Task<CartDto> GetCartByUserIdAsync(string userId);
    Task<CartDto> AddCartItemAsync(string userId, AddCartItemDto addCartItemDto);
    Task<CartDto> UpdateCartItemAsync(string userId, int productId, UpdateCartItemDto updateCartItemDto);
    Task<CartDto> RemoveCartItemAsync(string userId, int productId);
    Task ClearCartAsync(string userId);
}