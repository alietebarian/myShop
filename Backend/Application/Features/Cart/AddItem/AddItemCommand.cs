using MediatR;

namespace Application.Features.Cart.AddItem;

public record AddItemCommand
(
    Guid ProductId,
    int Quantity
) : IRequest;
