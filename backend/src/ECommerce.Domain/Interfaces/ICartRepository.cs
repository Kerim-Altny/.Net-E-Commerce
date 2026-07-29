
public interface ICartRepository : IRepository<Cart>
{
    Task<Cart?> GetCartByUserIdAsync(string userId);
    Task<Cart?> GetCartWithItemsAsync(int cartId);
}