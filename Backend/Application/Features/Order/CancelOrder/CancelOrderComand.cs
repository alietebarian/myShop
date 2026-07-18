using MediatR;

namespace Application.Features.Order.CancelOrder;

public record CancelOrderComand(Guid OrderId) : IRequest;
