using MediatR;
using Persistence;

namespace Application.Features.Product.DeleteProduct;

public class DeleteProductHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly AppDbContext _context;

    public DeleteProductHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(request.Id);

        if (product == null) throw new Exception("product not found");

        _context.Products.Remove(product);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
