namespace Application.Common.Models;

public class ErrorResponse
{
    public string Title { get; set; } = null!;
    public int Status { get; set; }
    public Dictionary<string, string[]>? Errors { get; set; }
}
