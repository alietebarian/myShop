using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Cart.ClearCart;

public class ClearCartHandler : IRequestHandler<ClearCartCommand>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public ClearCartHandler(ICurrentUserService currentUserService, AppDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task Handle(ClearCartCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(
                c => c.UserId == userId,
                cancellationToken);

        if (cart is null)
            throw new KeyNotFoundException("Cart not found.");

        _context.CartItems.RemoveRange(cart.Items);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
