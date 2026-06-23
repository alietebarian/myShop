namespace Application.Features.Auth.Common;

public class AuthResponse
{
    public string AccessToken { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string FullName { get; set; } = null!;
}
