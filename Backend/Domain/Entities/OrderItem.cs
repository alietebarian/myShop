namespace Domain.Entities;

public class OrderItem
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = default!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = default!;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
