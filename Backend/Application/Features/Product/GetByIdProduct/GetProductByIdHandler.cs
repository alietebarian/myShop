using Application.Features.Product.GetProducts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Product.GetByIdProduct;

public class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, GetProductDto>
{
    private readonly AppDbContext _context;

    public GetProductByIdHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<GetProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _context.Products
            .Where(x => x.Id == request.Id)
            .Select(p => new GetProductDto
            {
                Id = p.Id,
                Image = p.Image,
                Name = p.Name,
                Price = p.Price,
                Status = p.Status,
                CategoryName = p.Category.Name,
                Stock = p.Stock
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (product is null)
            throw new KeyNotFoundException("Product not found");

        return product;
    }
}
