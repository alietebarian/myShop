namespace Application.Features.Order.GetOrderById;

public class OrderDetailsDto
{
    public Guid Id { get; set; }

    public DateTime CreatedAt { get; set; }

    public decimal TotalPrice { get; set; }

    public string Status { get; set; } = "";

    public List<OrderItemDetailsDto> Items { get; set; }
        = [];
}
