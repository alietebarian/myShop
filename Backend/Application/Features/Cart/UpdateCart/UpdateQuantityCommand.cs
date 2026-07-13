using MediatR;

namespace Application.Features.Cart.UpdateCart;

public record UpdateQuantityCommand
(
    Guid CartItemId,
    int Quantity
) : IRequest;
