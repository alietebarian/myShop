using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Order.GetOrderById;

public class GetOrderByIdHandler : IRequestHandler<GetOrderByIdQuery, OrderDetailsDto>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetOrderByIdHandler(IMapper mapper, ICurrentUserService currentUserService, AppDbContext context)
    {
        _mapper = mapper;
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task<OrderDetailsDto> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();


        var order = await _context.Orders
            .AsNoTracking()
            .Include(x => x.items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(
                x => x.Id == request.Id &&
                     x.userId == userId,
                cancellationToken);


        if (order is null)
            throw new KeyNotFoundException(
                "Order not found.");


        return _mapper.Map<OrderDetailsDto>(order);
    }
}
