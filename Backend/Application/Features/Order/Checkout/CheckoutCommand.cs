using MediatR;

namespace Application.Features.Order.Checkout;

public record CheckoutCommand() : IRequest<Guid>;
