using Application.Common.Models;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Order.GetMyOrders;

public class GetMyOrdersHandler : IRequestHandler<GetMyOrdersQuery, PagedResult<OrderDto>>
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

    public async Task<PagedResult<OrderDto>> Handle(GetMyOrdersQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        IQueryable<Domain.Entities.Order> query = _context.Orders.AsQueryable();

        var totalCount = await query.CountAsync();

        var orders = await query
            .OrderBy(x => x.Id)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new PagedResult<OrderDto>
        {
            Items = orders,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount,
        };

        //return await _context.Orders
        //    .AsNoTracking()
        //    .Where(x => x.userId == userId)
        //    .OrderByDescending(x => x.CreatedAt)
        //    .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
        //    .ToListAsync(cancellationToken);


    }
}