using ECommerce.Application.DTOs.Carts;

namespace ECommerce.Application.Services.Carts;

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepository;
    private readonly IProductRepository _productRepository;


    public CartService(ICartRepository cartRepository, IProductRepository productRepository)
    {
        _cartRepository = cartRepository;
        _productRepository = productRepository;
    }
    private static CartDto MapToCartDto(Cart cart)
    {
        return new CartDto
        {
            Id = cart.Id,
            Items = cart.CartItems.Select(ci => new CartItemDto
            {
                Id = ci.Id,
                ProductId = ci.ProductId,
                ProductTitle = ci.Product.Title,
                ImageUrl = ci.Product.ImageUrl,
                UnitPrice = ci.Product.GetUnitPrice(ci.Quantity),
                Quantity = ci.Quantity
            }).ToList()
        };

    }

    private async Task<Cart> GetOrCreateCartAsync(string userId)
    {
        var cart = await _cartRepository.GetCartByUserIdAsync(userId);
        if (cart == null)
        {
            cart = new Cart { UserId = userId };
            await _cartRepository.AddAsync(cart);
            await _cartRepository.SaveChangesAsync();
            return cart;
        }
        var cartWithItems = await _cartRepository.GetCartWithItemsAsync(cart.Id);
        return cartWithItems ?? cart;
    }

    public async Task<CartDto> GetCartByUserIdAsync(string userId)
    {
        var cart = await GetOrCreateCartAsync(userId);
        return MapToCartDto(cart);
    }
    public async Task<CartDto> AddCartItemAsync(string userId, AddCartItemDto addCartItemDto)
    {
        var cart = await GetOrCreateCartAsync(userId);
        var product = await _productRepository.GetByIdAsync(addCartItemDto.ProductId);
        if (product == null)
        {
            throw new KeyNotFoundException("Product not found");
        }

        var existingCartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == addCartItemDto.ProductId);
        if (existingCartItem != null)
        {
            existingCartItem.Quantity += addCartItemDto.Quantity;
        }
        else
        {
            var newCartItem = new CartItem
            {
                ProductId = addCartItemDto.ProductId,
                Quantity = addCartItemDto.Quantity,
                Cart = cart,
                Product = product
            };
            cart.CartItems.Add(newCartItem);
        }

        await _cartRepository.SaveChangesAsync();
        return MapToCartDto(cart);
    }
    public async Task<CartDto> UpdateCartItemAsync(string userId, int productId, UpdateCartItemDto updateCartItemDto)
    {
        var cart = await GetOrCreateCartAsync(userId);
        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
        if (cartItem == null)
        {
            throw new KeyNotFoundException("Cart item not found");
        }

        cartItem.Quantity = updateCartItemDto.Quantity;
        if (cartItem.Quantity <= 0)
        {
            cart.CartItems.Remove(cartItem);
        }
        await _cartRepository.SaveChangesAsync();
        return MapToCartDto(cart);
    }
    public async Task<CartDto> RemoveCartItemAsync(string userId, int productId)
    {
        var cart = await GetOrCreateCartAsync(userId);
        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
        if (cartItem == null)
        {
            throw new KeyNotFoundException("Cart item not found");
        }

        cart.CartItems.Remove(cartItem);
        await _cartRepository.SaveChangesAsync();
        return MapToCartDto(cart);
    }

    public async Task ClearCartAsync(string userId)
    {
        var cart = await GetOrCreateCartAsync(userId);
        cart.CartItems.Clear();
        await _cartRepository.SaveChangesAsync();
    }
}