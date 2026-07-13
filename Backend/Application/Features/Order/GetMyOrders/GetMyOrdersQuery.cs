using MediatR;

namespace Application.Features.Order.GetMyOrders;

public record GetMyOrdersQuery : IRequest<List<OrderDto>>;
