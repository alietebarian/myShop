using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Order.GetMyOrders;

public class GetMyOrdersHandler : IRequestHandler<GetMyOrdersQuery, List<OrderDto>>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetMyOrdersHandler(ICurrentUserService currentUserService, AppDbContext context, IMapper mapper)
    {
        _currentUserService = currentUserService;
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<OrderDto>> Handle(GetMyOrdersQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        var orders = await _context.Orders
            .AsNoTracking()
            .Where(x => x.userId == userId)
            .Include(x => x.items)
            .ThenInclude(x => x.Product)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        //return orders.Select(order => new OrderDto
        //{
        //    Id = order.Id,
        //    CreatedAt = order.CreatedAt,
        //    TotalPrice = order.TotalPrice,
        //    Status = order.Status.ToString(),

        //    Items = order.items.Select(item => new OrderItemDto
        //    {
        //        ProductId = item.ProductId,
        //        ProductName = item.Product.Name,
        //        Price = item.Price,
        //        Quantity = item.Quantity
        //    }).ToList()

        //}).ToList();

        return _mapper.Map<List<OrderDto>>(orders);
    }
}
