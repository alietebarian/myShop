using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Category.GetCategory;

public class GetCategoriesHandler : IRequestHandler<GetCategoriesQuery, PagedResult<GetCategoriesDto>>
{
    private readonly AppDbContext _context;

    public GetCategoriesHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<GetCategoriesDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        IQueryable<Domain.Entities.Category> query = _context.Categories.AsQueryable();

        if(!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(x => x.Name.Contains(request.Search));

        var totalCount = await query.CountAsync(cancellationToken);

        var categories = await query
            .OrderBy(x => x.Name)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => new GetCategoriesDto
            {
                Id = c.Id,
                Name = c.Name,
                Status = c.Status,
                ProductCount = c.Products.Count()
            })
            .ToListAsync(cancellationToken);

        return new PagedResult<GetCategoriesDto>
        {
            Items = categories,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }
}
