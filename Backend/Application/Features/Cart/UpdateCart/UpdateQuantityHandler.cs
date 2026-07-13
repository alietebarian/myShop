using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Cart.UpdateCart;

public class UpdateQuantityHandler : IRequestHandler<UpdateQuantityCommand>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public UpdateQuantityHandler(ICurrentUserService currentUserService, AppDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task Handle(UpdateQuantityCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        var item = await _context.CartItems
            .Include(x => x.Cart)
            .Include(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == request.CartItemId && x.Cart.UserId == userId, cancellationToken);

        if (item == null)
            throw new KeyNotFoundException("Cart item not found");

        if (!item.Product.Status)
            throw new Exception("Product is inactive.");

        if (request.Quantity > item.Product.Stock)
            throw new Exception("Insufficient stock.");

        item.Quantity = request.Quantity;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
