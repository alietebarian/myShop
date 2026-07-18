using MediatR;

namespace Application.Features.Order.GetOrderById;

public record GetOrderByIdQuery(
    Guid Id
) : IRequest<OrderDetailsDto>;
