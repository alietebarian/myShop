namespace Application.Features.Order.GetMyOrders;

public class OrderDto
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;
    public List<OrderItemDto> Items { get; set; } = [];
}
