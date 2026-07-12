namespace Domain.Entities;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Image { get; set; } = null!;
    public string Name { get; set; } = null!;
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public string Unit { get; set; } = null!;
    public int Price { get; set; }
    public int Stock { get; set; }
    public bool Status { get; set; } = true;
    public string Description { get; set; } = null!;

    public ICollection<CartItem> CartItems { get; set; }
        = new List<CartItem>();
}
