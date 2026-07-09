using MediatR;

namespace Application.Features.Product.DeleteProduct;

public record DeleteProductCommand
(
    Guid Id
) : IRequest;
