using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Product.CreateProduct;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, Guid>
{
    private readonly AppDbContext _context;
    public CreateProductHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(x => x.Name.ToLower() == request.CategoryName.ToLower(), cancellationToken);

        if (category is null)
            throw new KeyNotFoundException("Category not found");

        var product = new Domain.Entities.Product
        {
            Image = request.Image,
            Name = request.Name,
            CategoryId = category!.Id,
            Unit = request.Unit,
            Price = request.Price,
            Stock = request.Stock,
            Description = request.Description,
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}
