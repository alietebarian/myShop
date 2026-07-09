namespace Domain.Entities;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public bool Status { get; set; } = true;

    public ICollection<Product> Products { get; set; } = new List<Product>();
}
