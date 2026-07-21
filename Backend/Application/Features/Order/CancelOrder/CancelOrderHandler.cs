using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Order.CancelOrder;

public class CancelOrderHandler : IRequestHandler<CancelOrderComand>
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public CancelOrderHandler(ICurrentUserService currentUserService, AppDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task Handle(CancelOrderComand request, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUser();

        var order = await GetOrder(
            request.OrderId,
            userId,
            cancellationToken);

        ValidateOrder(order);

        RestoreStock(order);

        order.Status = OrderStatus.Cancelled;

        await _context.SaveChangesAsync(cancellationToken);
    }

    private string GetCurrentUser()
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrWhiteSpace(userId))
            throw new UnauthorizedAccessException();

        return userId;
    }

    private async Task<Domain.Entities.Order> GetOrder(
    Guid orderId,
    string userId,
    CancellationToken cancellationToken)
    {
        var order = await _context.Orders
            .Include(x => x.items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(
                x => x.Id == orderId &&
                     x.userId == userId,
                cancellationToken);

        if (order is null)
            throw new KeyNotFoundException("Order not found.");

        return order;
    }

    private static void ValidateOrder(Domain.Entities.Order order)
    {
        if (order.Status == OrderStatus.Cancelled)
            throw new InvalidOperationException("Order is already cancelled.");

        if (order.Status == OrderStatus.Shipped)
            throw new InvalidOperationException("Shipped orders cannot be cancelled.");

        if (order.Status == OrderStatus.Delivered)
            throw new InvalidOperationException("Delivered orders cannot be cancelled.");

        if (order.Status == OrderStatus.Preparing)
            throw new InvalidOperationException("Preparing orders cannot be cancelled.");
    }

    private static void RestoreStock(Domain.Entities.Order order)
    {
        foreach (var item in order.items)
        {
            item.Product.Stock += item.Quantity;
        }
    }
}
