using MediatR;

namespace Application.Features.Product.EditProduct;

public record EditProductCommand
(
    Guid id,
    string Image,
    string Name,
    Guid CategoryId,
    string Unit,
    int Price,
    int Stock,
    bool Status,
    string Description
) : IRequest;
