using Application.Features.Auth.Common;
using MediatR;

namespace Application.Features.Auth.Register;

public record RegisterCommand
(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string PhoneNumber
) : IRequest<AuthResponse>;
