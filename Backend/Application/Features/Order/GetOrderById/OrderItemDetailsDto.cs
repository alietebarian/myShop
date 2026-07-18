namespace Application.Features.Order.GetOrderById;

public class OrderItemDetailsDto
{
    public string ProductName { get; set; } = "";

    public decimal Price { get; set; }

    public int Quantity { get; set; }
}
