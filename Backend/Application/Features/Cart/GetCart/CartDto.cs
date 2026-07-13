namespace Application.Features.Cart.GetCart;

public class CartDto
{
    public Guid Id { get; set; }
    public decimal TotalPrice { get; set; }
    public List<CartItemDto> Items { get; set; } = [];
}
