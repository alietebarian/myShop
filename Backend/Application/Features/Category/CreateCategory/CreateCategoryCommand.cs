using MediatR;

namespace Application.Features.Category.CreateCategory;

public record CreateCategoryCommand
(
    string Name
) : IRequest<Guid>;