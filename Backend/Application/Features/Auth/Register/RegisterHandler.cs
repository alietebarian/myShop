using Application.Features.Auth.Common;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Auth.Register;

public class RegisterHandler : IRequestHandler<RegisterCommand, AuthResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterHandler( UserManager<User> userManager ,IJwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);

        if (existingUser is not null) throw new Exception("Email already exists");

        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email,
            PhoneNumber = request.PhoneNumber,
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            throw new Exception(
                string.Join(", ", result.Errors.Select(x => x.Description))
            );
        }

        const string role = "User";
        var roleResult = await _userManager.AddToRoleAsync(user, "User");

        if (!roleResult.Succeeded)
        {
            throw new Exception(
                string.Join(", ", roleResult.Errors.Select(x => x.Description)));
        }

        return new AuthResponse
        {
            AccessToken = _jwtTokenGenerator.GenerateToken(user, role),
            UserId = user.Id,
            Email = request.Email!,
            FullName = $"{request.FirstName} {request.LastName}",
            Role = role
        };
    }
}
