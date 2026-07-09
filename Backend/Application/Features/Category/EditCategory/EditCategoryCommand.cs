using MediatR;

namespace Application.Features.Category.EditCategory;

public record EditCategoryCommand
(
    Guid Id,
    string Name,
    bool Status
) : IRequest;
