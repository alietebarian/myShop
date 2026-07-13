using MediatR;

namespace Application.Features.Cart.RemoveItem;

public record RemoveItemCommand(Guid CartItemId) : IRequest;
