using Microsoft.AspNetCore.Http;

namespace Application.Features.Product.CreateProduct;

public class CreateProductDto
{
    public IFormFile Image { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string CategoryName { get; set; } = null!;
    public string Unit { get; set; } = null!;
    public int Price { get; set; }
    public int Stock { get; set; }
    public string Description { get; set; } = null!;
}
