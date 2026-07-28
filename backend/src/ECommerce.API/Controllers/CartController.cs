using System.Security.Claims;
using ECommerce.Application.DTOs.Carts;
using ECommerce.Application.Services.Carts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var cart = await _cartService.GetCartByUserIdAsync(GetUserId());
        return Ok(cart);
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItemToCart([FromBody] AddCartItemDto addCartItemDto)
    {
        try
        {
            var cart = await _cartService.AddCartItemAsync(GetUserId(), addCartItemDto);
            return Ok(cart);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPut("items/{productId}")]
    public async Task<IActionResult> UpdateCartItem(int productId, [FromBody] UpdateCartItemDto updateCartItemDto)
    {
        try
        {
            var cart = await _cartService.UpdateCartItemAsync(GetUserId(), productId, updateCartItemDto);
            return Ok(cart);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("items/{productId}")]
    public async Task<IActionResult> RemoveCartItem(int productId)
    {
        try
        {
            var cart = await _cartService.RemoveCartItemAsync(GetUserId(), productId);
            return Ok(cart);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        await _cartService.ClearCartAsync(GetUserId());
        return NoContent();
    }
}
