namespace Api.Dtos;

public class EditProductDto
{
    public IFormFile? Image { get; set; } // اختیاری - nullable
    public string Name { get; set; } = null!;
    public Guid CategoryId { get; set; }
    public string Unit { get; set; } = null!;
    public int Price { get; set; }
    public int Stock { get; set; }
    public bool Status { get; set; }
    public string Description { get; set; } = null!;
}
