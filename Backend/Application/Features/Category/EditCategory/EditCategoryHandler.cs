using Application.Features.Category.CreateCategory;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Category.EditCategory;

public class EditCategoryHandler : IRequestHandler<EditCategoryCommand>
{
    private readonly AppDbContext _context;

    public EditCategoryHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task Handle(EditCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category is null)
            throw new KeyNotFoundException("Category not found.");

        category.Name = request.Name;
        category.Status = request.Status;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
