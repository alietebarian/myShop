using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Migrations;

namespace Application.Features.Order.Checkout;

public class CheckoutHandler : IRequestHandler<CheckoutCommand, Guid>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public CheckoutHandler(ICurrentUserService currentUserService, AppDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task<Guid> Handle(CheckoutCommand request, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUser();

        var cart = await GetCart(userId, cancellationToken);
        ValidationCart(cart);

        var order = CreateOrder(userId);
        CreateOrderitems(order, cart);

        DecreaseProductStock(cart);

        ClearCart(cart);

        await _context.SaveChangesAsync(cancellationToken);

        return order.Id;
    }

    private string GetCurrentUser()
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        return userId;
    }

    public async Task<Domain.Entities.Cart> GetCart(string userId, CancellationToken cancellationToken)
    {
        var cart = await _context.Carts
            .Include(x => x.Items)
            .ThenInclude(xx => xx.Product)
            .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);

        if(cart == null)
        {
            throw new Exception("Cart not found.");
        }

        return cart;
    }

    public static void ValidationCart(Domain.Entities.Cart cart)
    {
        if (!cart.Items.Any())
            throw new Exception("Cart is empty.");

        foreach (var item in cart.Items)
        {
            if (!item.Product.Status)
                throw new Exception(
                    $"{item.Product.Name} is inactive.");

            if (item.Quantity > item.Product.Stock)
                throw new Exception(
                    $"{item.Product.Name} has insufficient stock.");
        }
    }

    private Domain.Entities.Order CreateOrder(string userId)
    {
        var order = new Domain.Entities.Order
        {
            userId = userId,

            CreatedAt = DateTime.UtcNow,

            Status = OrderStatus.Pending,

            TotalPrice = 0
        };

        _context.Orders.Add(order);

        return order;
    }

    private void CreateOrderItems(
    Domain.Entities.Order order,
    Domain.Entities.Cart cart)
    {
        foreach (var item in cart.Items)
        {
            order.items.Add(new OrderItem
            {
                ProductId = item.ProductId,

                Quantity = item.Quantity,

                Price = item.Product.Price
            });

            order.TotalPrice +=
                item.Product.Price * item.Quantity;
        }
    }

    private static void DecreaseProductStock(Domain.Entities.Cart cart)
    {
        foreach (var item in cart.Items)
        {
            item.Product.Stock -= item.Quantity;
        }
    }

    private void ClearCart(Domain.Entities.Cart cart)
    {
        _context.CartItems.RemoveRange(cart.Items);
    }
}
