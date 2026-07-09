using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Product.EditProduct;

public class EditProductHandler : IRequestHandler<EditProductCommand>
{
    private readonly AppDbContext _context;

    public EditProductHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task Handle(EditProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);

        if (product is null) throw new Exception("Product not found");

        product.Description = request.Description;
        product.Name = request.Name;
        product.Price = request.Price;
        product.Unit = request.Unit;
        product.Image = request.Image;
        product.Stock = request.Stock;
        product.Status = request.Status;

        var categoryExists = await _context.Categories
    .AnyAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
            throw new Exception("Category not found");

        product.CategoryId = request.CategoryId;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
