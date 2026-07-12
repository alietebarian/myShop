using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Cart.AddItem;

public class AddItemHandler : IRequestHandler<AddItemCommand>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public AddItemHandler(AppDbContext context ,ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task Handle(AddItemCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        var product = await _context.Products
            .FirstOrDefaultAsync(
                x => x.Id == request.ProductId,
                cancellationToken);

        if (product is null)
            throw new KeyNotFoundException("Product not found.");

        var cart = await _context.Carts
            .Include(x => x.Items)
            .FirstOrDefaultAsync(
                x => x.UserId == userId,
                cancellationToken);

        if (cart is null)
        {
            cart = new Domain.Entities.Cart
            {
                UserId = userId
            };

            _context.Carts.Add(cart);
        }

        var item = cart.Items
            .FirstOrDefault(x => x.ProductId == request.ProductId);

        if (item is not null)
        {
            item.Quantity += request.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                ProductId = request.ProductId,
                Quantity = request.Quantity
            });
        }

        if (!product.Status)
            throw new Exception("Product is inactive.");

        if (request.Quantity > product.Stock)
            throw new Exception("Insufficient stock.");

        var newQuantity = item.Quantity + request.Quantity;

        if (newQuantity > product.Stock)
            throw new Exception("Insufficient stock.");

        await _context.SaveChangesAsync(cancellationToken);
    }
}
