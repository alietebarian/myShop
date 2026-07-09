using Application.Common.Models;
using MediatR;

namespace Application.Features.Product.GetProducts;

public record GetProductQuery
(
    int PageSize,
    int PageNumber,
    string? Search
) : IRequest<PagedResult<GetProductDto>>;
