namespace Domain.Entities;

public class Order
{
    public Guid Id { get; set; }
    public string userId { get; set; } = default!;
    public decimal TotalPrice { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<OrderItem> items { get; set; } = new List<OrderItem>();
}