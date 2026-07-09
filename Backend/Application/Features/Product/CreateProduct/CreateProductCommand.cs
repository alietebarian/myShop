using MediatR;

namespace Application.Features.Product.CreateProduct;

public record CreateProductCommand
(
    string Image,
    string Name,
    string CategoryName,
    string Unit,
    int Price,
    int Stock,
    string Description
) : IRequest<Guid>;
