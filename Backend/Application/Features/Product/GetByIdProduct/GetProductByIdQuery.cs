using Application.Features.Product.GetProducts;
using MediatR;

namespace Application.Features.Product.GetByIdProduct;

public record GetProductByIdQuery
(
    Guid Id
) : IRequest<GetProductDto>;
