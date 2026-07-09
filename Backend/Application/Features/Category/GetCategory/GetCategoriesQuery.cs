using Application.Common.Models;
using MediatR;

namespace Application.Features.Category.GetCategory;

public record GetCategoriesQuery
(
    int PageSize,
    int PageNumber,
    string? Search
) : IRequest<PagedResult<GetCategoriesDto>>;
