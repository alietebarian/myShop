using Domain.Entities;

namespace Application.Features.Product.GetProducts;

public class GetProductDto
{
    public Guid Id { get; set; }
    public string Image { get; set; } = null!;
    public string Name { get; set; } = null!;
    public int Price { get; set; }
    public bool Status { get; set; }
    public string Description { get; set; } = null!;
    public string Unit { get; set; } = null!;
    public string CategoryName { get; set; } = null!;
    public Guid categoryId { get; set; }
    public int Stock { get; set; }
}
