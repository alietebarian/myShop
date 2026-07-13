using MediatR;

namespace Application.Features.Cart.GetCart;

public record GetCartQuery : IRequest<CartDto>;
