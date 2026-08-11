using Application.Common.Models;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Product.GetProducts;

public class GetProductsHandler : IRequestHandler<GetProductQuery, PagedResult<GetProductDto>>
{
    private readonly AppDbContext _context;

    public GetProductsHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<GetProductDto>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        IQueryable<Domain.Entities.Product> query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(x => x.Name.Contains(request.Search));

        var totalCount = await query.CountAsync(cancellationToken);

        var products = await query
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(p => new GetProductDto
            {
                Id = p.Id,
                Image = p.Image,
                Name = p.Name,
                Price = p.Price,
                Status = p.Status,
                CategoryName = p.Category.Name,
                Stock = p.Stock,
                Unit = p.Unit,
                categoryId = p.CategoryId,
                Description = p.Description
            })
            .ToListAsync(cancellationToken);

        return new PagedResult<GetProductDto>
        {
            Items = products,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }
}
