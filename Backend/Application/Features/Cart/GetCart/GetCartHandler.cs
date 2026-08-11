using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Cart.GetCart;

public class GetCartHandler : IRequestHandler<GetCartQuery, CartDto>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public GetCartHandler(AppDbContext context ,ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<CartDto> Handle(GetCartQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        var cart = await _context.Carts
            .AsNoTracking()
            .OrderByDescending(x => x.Id)
            .Include(x => x.Items)
            .ThenInclude(xx => xx.Product)
            .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);

        if(cart is null)
            return new CartDto();

        return new CartDto
        {
            Id = cart.Id,
            TotalPrice = cart.Items.Sum(i => i.Product.Price * i.Quantity),

            Items = cart.Items.Select(i => new CartItemDto
            {
                Id = i.Id,
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Price = i.Product.Price,
                Quantity = i.Quantity
            }).ToList()
        };
    }
}
