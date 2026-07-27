using Application.Common.Models;
using MediatR;

namespace Application.Features.Order.GetMyOrders;

public record GetMyOrdersQuery(int PageSize, int PageNumber) : IRequest<PagedResult<OrderDto>>;
