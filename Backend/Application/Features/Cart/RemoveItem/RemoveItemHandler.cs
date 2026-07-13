using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Cart.RemoveItem;

public class RemoveItemHandler : IRequestHandler<RemoveItemCommand>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public RemoveItemHandler(ICurrentUserService currentUserService, AppDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task Handle(RemoveItemCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        var cartItem = await _context.CartItems
            .Include(x => x.Cart)
            .FirstOrDefaultAsync(
                x => x.Id == request.CartItemId &&
                     x.Cart.UserId == userId,
                cancellationToken);

        if (cartItem is null)
            throw new KeyNotFoundException("Cart item not found.");

        _context.CartItems.Remove(cartItem);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
